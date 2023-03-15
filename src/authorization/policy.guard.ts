import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Scope,
  Type,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { PolicyFactory } from './policy.factory';
import { PolicyHandler } from './policy.handler';
import { CHECK_POLICIES_KEY } from './policy.decorator';

/**
 * A guard that checks whether a user is authorized to access a resource using one or more policy handlers.
 */
@Injectable()
export class PolicyGuard implements CanActivate {
  private readonly logger = new Logger(PolicyGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly policyFactory: PolicyFactory,
    private readonly moduleRef: ModuleRef,
  ) {}

  /**
   * Checks whether the user is authorized to access the resource by checking against all applicable policy handlers.
   * 
   * @param {ExecutionContext} context - The execution context for the current request
   * @returns {Promise<boolean>} indicating whether the user is authorized to access the resource
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('AuthorizationGuard is executing...');

    const policyHandlers =
      this.reflector.get<Type<PolicyHandler>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const ability = this.policyFactory.createForUser(user);
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(request, contextId);
    const handlers: PolicyHandler[] = [];

    for (const handler of policyHandlers) {
      const policyScope = this.moduleRef.introspect(handler).scope;
      let policyHandler: PolicyHandler;

      if (policyScope === Scope.DEFAULT) {
        policyHandler = this.moduleRef.get(handler, { strict: false });
      } else {
        policyHandler = await this.moduleRef.resolve(handler, contextId, {
          strict: false,
        });
      }

      handlers.push(policyHandler);
    }

    return handlers.every((handler) => handler.handle(user));
  }
}

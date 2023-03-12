import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationAction } from './authorization-action.enum';
import { ACTION_KEY } from './authorization.decorator';
import { AuthorizationAbilityFactory } from './authorization-ability.factory';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationFactory: AuthorizationAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAction =
      this.reflector.getAllAndOverride<AuthorizationAction>(ACTION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!requiredAction) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ability = await this.authorizationFactory.createForUser(user);
    const subject = request.baseUrl.split('/')[1];

    return ability.can(requiredAction, subject);
  }
}

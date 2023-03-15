import { AppAbility, Subjects } from '../types';
import {
  AbilityBuilder,
  Ability,
  ExtractSubjectType,
  AbilityClass,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../users/user.schema';
import { Action } from './action.enum';
import { TaskDocument } from '../tasks/task.schema';

/**
 * PolicyFactory creates a new Casl.js Ability instance for the user.
 * It sets up rules for the user's abilities based on the user's document.
 */
@Injectable()
export class PolicyFactory {
  createForUser(user: UserDocument) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user !== undefined) {
      can(Action.Read, TaskDocument);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

import { TaskDocument } from '../tasks/task.schema';
import { AbilityBuilder, Ability, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, Subjects } from 'types';
import { UserDocument } from '../users/user.schema';
import { AuthorizationAction } from './authorization-action.enum';

@Injectable()
export class AuthorizationAbilityFactory {
  createForUser(user: UserDocument): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability);

    if (user) {
      can(AuthorizationAction.Manage, 'all');
    } else {
      can(AuthorizationAction.Read, 'all');
    }

    can(AuthorizationAction.Update, TaskDocument, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

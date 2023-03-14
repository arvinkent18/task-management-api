import { UserDocument } from './users/user.schema';
import { TaskDocument } from './tasks/task.schema';
import {
  Ability,
  AbilityBuilder,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Action } from './authorization/action.enum';

// CASL types
export type Subjects = InferSubjects<
  typeof UserDocument | typeof TaskDocument | 'all'
>;
// export type AppAbility = PureAbility<[Action, Subjects]>;
// export type AppAbilityBuilder = AbilityBuilder<AppAbility>;
export type AppAbility = Ability<[Action, Subjects]>;

export type FlatTask = TaskDocument & {
  'author.id': TaskDocument['author']['id']
};

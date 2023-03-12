import { Ability, InferSubjects } from '@casl/ability';
import { TaskDocument } from './tasks/task.schema';
import { UserDocument } from './users/user.schema';
import { AuthorizationAction } from './authorization/authorization-action.enum';

export type Subjects =
  | InferSubjects<typeof UserDocument | typeof TaskDocument>
  | 'all';

export type AppAbility = Ability<[AuthorizationAction, Subjects]>;

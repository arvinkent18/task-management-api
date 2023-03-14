import { UserDocument } from './../../users/user.schema';
import { PolicyHandler } from '../policy.handler';
import { TaskDocument } from '../../tasks/task.schema';

export class ReadTaskHandler implements PolicyHandler {
  constructor(private readonly taskModel: TaskDocument) {}

  handle(user: UserDocument): boolean{
    const { author } = this.taskModel;
    const isAllowed = author.toString() === user.id;

    return isAllowed;
  }
}

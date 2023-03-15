import { UserDocument } from '../../../users/user.schema';
import { PolicyHandler } from '../../policy.handler';
import { TaskDocument } from '../../../tasks/task.schema';

/**
 * A policy handler that determines whether a user is authorized to delete a specific task.
 */
export class DeleteTaskHandler implements PolicyHandler {
  constructor(private readonly taskModel: TaskDocument) {}
  
  /**
   * Determines whether a user is authorized to read the task associated with this DeleteTaskHandler instance
   * 
   * @param {UserDocument} user the UserDocument representing the user requesting access to the task
   * @returns {boolean} indicating whether the user is authorized to delete the task
   */
  handle(user: UserDocument): boolean{
    const { author } = this.taskModel;
    const isAllowed = author.toString() === user.id;DeleteTaskHandler

    return isAllowed;
  }
}

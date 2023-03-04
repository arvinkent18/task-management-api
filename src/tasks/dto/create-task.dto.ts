import { TaskStatus } from "tasks/task-status.enum";

export class CreateTaskDto {
  readonly title!: string;
  readonly description!: string;
  readonly status!: TaskStatus;
}
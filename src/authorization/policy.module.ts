import { TasksModule } from '../tasks/task.module';
import { Module } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { taskPolicyProviders } from './providers/tasks.provider';

@Module({
  imports: [
    TasksModule,
  ],
  providers: [
    PolicyFactory,
    ...taskPolicyProviders,
  ],
  exports: [
    PolicyFactory,
    ...taskPolicyProviders,
  ],
})
export class PolicyModule {}

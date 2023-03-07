import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description!: string;

  @ApiProperty({
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value.toUpperCase())
  readonly status!: TaskStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;
}

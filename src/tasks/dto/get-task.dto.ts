import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

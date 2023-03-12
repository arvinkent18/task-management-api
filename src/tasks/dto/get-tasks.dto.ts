import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class GetTasksDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @Min(1)
  limit: number;
}

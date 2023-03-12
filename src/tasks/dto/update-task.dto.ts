import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  readonly title: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly description: string;
}

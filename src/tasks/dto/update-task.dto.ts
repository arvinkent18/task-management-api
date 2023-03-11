import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTaskDto {
  @ApiPropertyOptional()
  readonly title: string;

  @ApiPropertyOptional()
  readonly description: string;
}
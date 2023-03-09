import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}

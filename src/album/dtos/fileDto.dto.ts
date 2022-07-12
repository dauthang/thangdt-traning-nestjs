import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FileDto {
  @ApiProperty()
  file: any;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  name: string;
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;
  @ApiProperty()
  link: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

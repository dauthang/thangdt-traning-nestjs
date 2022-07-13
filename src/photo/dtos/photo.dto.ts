import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  name: string;
  userId: number;
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  @ApiProperty()
  link: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

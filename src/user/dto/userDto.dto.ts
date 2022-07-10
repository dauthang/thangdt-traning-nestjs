import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  status: string;
}

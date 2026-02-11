import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(8, 50)
  password: string;
}

export class LoginUserDto extends CreateUserDto {}

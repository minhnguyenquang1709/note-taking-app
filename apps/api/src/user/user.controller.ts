import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async registerNewUser(@Body() dto: CreateUserDto) {
    return await this.userService.registerNewUser(dto);
  }

  @Post('login')
  async login() {
    return await this.userService.login();
  }

  @Patch('update')
  async updatePassword() {
    return await this.userService.updatePassword();
  }

  @Post('delete')
  async deleteUser() {
    return await this.userService.deleteUser();
  }

  @Get('me')
  async getCurrentUser() {
    return await this.userService.getCurrentUser();
  }
}

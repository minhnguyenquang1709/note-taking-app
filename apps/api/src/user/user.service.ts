import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async registerNewUser(dto: CreateUserDto) {
    try {
      const hashedPassword = hashPassword(dto.password);
      const user: Omit<User, 'id'> = {
        username: dto.username,
        hashedPassword,
      };
      const createdUser = this.userRepo.create(dto);
      return await this.userRepo.save(user);
    } catch (error) {
      throw new HttpException('Failed to register new user', 500);
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          username: dto.username,
        },
      });
    } catch (error) {}
  }
}

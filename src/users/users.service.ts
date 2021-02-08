import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      this.handleError(error?.code);
    }
  }

  private handleError(errorCode: string): void {
    if (errorCode === PostgresErrorCode.UniqueViolation) {
      throw new BadRequestException('User with that email already exists');
    }
    throw new InternalServerErrorException('Something went wrong');
  }
}

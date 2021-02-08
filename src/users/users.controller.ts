import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedResponse } from './models/user-created.response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: [UserCreatedResponse],
  })
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreatedResponse> {
    const user = await this.usersService.createUser(createUserDto);
    return new UserCreatedResponse(user);
  }
}

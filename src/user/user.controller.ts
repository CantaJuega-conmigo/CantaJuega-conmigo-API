import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import User from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from 'src/core/auth/decorators';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body()
    createUserDTO: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('auth')
  async authUser(@GetUser() user: AuthUserDTO): Promise<{
    user: User;
    token: string;
  }> {
    return this.userService.authUser(user.id);
  }
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: AuthUserDTO,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

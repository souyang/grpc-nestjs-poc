import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, GetAllUsersRequest, UserUpdateFields } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserRequest) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/list')
  findAll(@Body() request: GetAllUsersRequest) {
    return this.usersService.getAllUsers(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateFields) {
    return this.usersService.updateUser({id, updateFields: updateUserDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser({id});
  }

  @Post('email')
  emailUsers() {
    return this.usersService.emailUsers();
  }
}
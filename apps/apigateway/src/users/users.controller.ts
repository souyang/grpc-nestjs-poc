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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { 
  CreateUserRequest as CreateUserRequestDto,
  UpdateUserRequest as UpdateUserRequestDto,
  GetAllUsersRequest as GetAllUsersRequestDto,
  GetUserByIdRequest as GetUserByIdRequestDto,
 } from './dto'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ description: 'User data', type: CreateUserRequestDto})
  @ApiResponse({ status: 201, description: 'User created' })
  create(@Body() createUserDto: CreateUserRequest) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/list')
  @ApiOperation({ summary: 'List users with pagination' })
  @ApiBody({ description: 'pagination data', type: GetUserByIdRequestDto})
  @ApiResponse({ status: 200, description: 'Returns limited users in a single page' })
  findAll(@Body() request: GetAllUsersRequest) {
    return this.usersService.getAllUsers(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by Id' })
  @ApiResponse({ status: 200, description: 'User found' })
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById({id});
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a single user' })
  @ApiBody({ description: 'User update fields', type: UpdateUserRequestDto })
  @ApiResponse({ status: 200, description: 'User updated' })
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateFields) {
    return this.usersService.updateUser({id, updateFields: updateUserDto});
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single user by id' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser({id});
  }

  @Post('email')
  @ApiOperation({ summary: 'Send email in batch to all users' })
  @ApiResponse({ status: 200, description: 'Emails sent' })
  emailUsers() {
    return this.usersService.emailUsers();
  }
}
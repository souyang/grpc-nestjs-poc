import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_PACKAGE_NAME,
  CreateUserRequest,
  GetAllUsersRequest,
  GetUserByIdRequest,
  PaginationRequest,
  UpdateUserRequest,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UserServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}
 // glue the grpc client with API Gateway
  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  createUser(createUserDto: CreateUserRequest) {
    return this.usersService.createUser(createUserDto);
  }

  getAllUsers(request: GetAllUsersRequest) {
    return this.usersService.getAllUsers(request);
  }

  getUserById(request: GetUserByIdRequest) {
    return this.usersService.getUserById(request);
  }

  updateUser(updateUserDto: UpdateUserRequest) {
    return this.usersService.updateUser(updateUserDto);
  }

  deleteUser(request: GetUserByIdRequest) {
    return this.usersService.deleteUser(request);
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationRequest>();
    users$.next({ page: 0, limit: 25, sortFields: []  });
    users$.next({ page: 1, limit: 25 , sortFields: [] });
    users$.next({ page: 2, limit: 25 , sortFields: [] });
    users$.next({ page: 3, limit: 25 , sortFields: [] });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.streamUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
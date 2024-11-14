import { Injectable, NotFoundException, OnModuleInit, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {
  CreateUserRequest,
  GetAllUsersRequest,
  PaginationMetadata,
  PaginationRequest,
  SortingField,
  SortOrder,
  Status,
  UpdateUserRequest,
User,
UserResponse,
UsersResponse
} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];
  onModuleInit() {
    try {
      for (let i = 0; i <= 100; i++) {
        this.create({ username: randomUUID(), password: randomUUID(), age: Math.random() * (50 - 18) + 18 });
      }
    } catch (error) {
      console.error('Error initializing users:', error);
      throw new InternalServerErrorException('Failed to initialize users.');
    }
  }
  

  create(createUserDto: CreateUserRequest): UserResponse {
    try {
      const user: User = {
        ...createUserDto,
        subscribed: false,
        id: randomUUID(),
      };
      this.users.push(user);
      return {user};
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }
 sortUser(users: User[], sortFields: SortingField[]) {
  return users.sort((a, b) => {
      for (const sortField of sortFields) {
          const { field, order } = sortField;

          const valueA = a[field];
          const valueB = b[field];

          if (valueA < valueB) {
              return order === SortOrder.ASC ? -1 : 1;
          }
          if (valueA > valueB) {
              return order === SortOrder.ASC ? 1 : -1;
          }
      }
      return 0;
    }); 
 }

  findAll(request: GetAllUsersRequest): UsersResponse {
    const { pagination } = request;
    const { page, limit, sortFields } = pagination;
    const offset = page * limit;
    if (!sortFields || sortFields.length === 0) { 
      sortFields.push({field: "name", order: SortOrder.ASC})
    }
    const paginationMeta: PaginationMetadata = {
      totalItems: this.users.length,
      totalPages: Math.floor(this.users.length / limit),
      currentPage: page,
      itemsPerPage: limit,
    }
    const sortedUsers = this.sortUser(this.users, sortFields);
    const userResult = sortedUsers.slice(offset, offset + limit);

    return {users: userResult, metadata: paginationMeta};
  }

  findOne(id: string): UserResponse {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return { user: this.users[userIndex] };
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  update(id: string, updateUserDto: UpdateUserRequest): UserResponse {
    const { updateFields } = updateUserDto;
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateFields,
      };
      return {user: this.users[userIndex]};
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  remove(id: string): Status {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex);
      return {
        code: HttpStatus.OK,
        message: `user with id ${id} has been deleted`
      }
    }
    return {
      code: HttpStatus.NOT_FOUND,
      message: `user with id ${id} has been deleted`
    }
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationRequest>,
  ): Observable<UsersResponse> {
    const subject = new Subject<UsersResponse>();
    const onNext = (paginationDto: PaginationRequest) => {
      const { page, limit, sortFields} = paginationDto;
      const start = page * limit;
      const sortedUsers = this.sortUser(this.users,sortFields)
      const paginationMeta: PaginationMetadata = {
        totalItems: this.users.length,
        totalPages: Math.floor(this.users.length / limit),
        currentPage: page,
        itemsPerPage: limit,
      }
      subject.next({
        users: sortedUsers.slice(start, start + limit),
        metadata: paginationMeta
      });
    };

    const onError = (error: any) => {
      console.error('Error in pagination stream:', error);
      subject.error(new InternalServerErrorException('Failed to paginate users.'));
    };

    const onComplete = () => subject.complete();

    paginationDtoStream.pipe(
      catchError(error => {
        onError(error);
        return throwError(() => new InternalServerErrorException('Pagination error.'));
      })
    ).subscribe({
      next: onNext,
      error: onError,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}

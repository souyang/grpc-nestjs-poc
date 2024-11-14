import { Injectable, NotFoundException, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
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
  

  create(createUserDto: CreateUserDto): User {
    try {
      const user: User = {
        ...createUserDto,
        subscribed: false,
        socialMedia: {},
        id: randomUUID(),
      };
      this.users.push(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex, 1)[0];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
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

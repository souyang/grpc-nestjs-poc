import { BadRequestException, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, GetAllUsersRequest, UserServiceController, UserServiceControllerMethods, PaginationRequest, SortOrder, GetUserByIdRequest, UpdateUserRequest, Status, UserResponse, UsersResponse } from '@app/common';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  getAllUsers(request: GetAllUsersRequest): Promise<UsersResponse> | Observable<UsersResponse> | UsersResponse {
    try {
      const pagination = this.getPaginationOrDefault(request.pagination);
      return this.usersService.findAll({ pagination });
    } catch(e) {
      this.logger.error(e.message);
      throw(e);
    }
  }
  getUserById(request: GetUserByIdRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse {
    try {
      return this.usersService.findOne(request.id);
    } catch (e) {
      this.logger.error(e.message);
      throw(e);
    }
  }
  deleteUser(request: GetUserByIdRequest): Promise<Status> | Observable<Status> | Status {
    try {
    return this.usersService.remove(request.id);
    } catch (e) {
      this.logger.error(e.message);
      throw(e);
    }
  }
  streamUsers(request: Observable<PaginationRequest>): Observable<UsersResponse> {
    try {
    return this.usersService.queryUsers(request);
    } catch (e) {
      this.logger.error(e.message);
      throw(e);
    }
  }
  
  createUser(createUserDto: CreateUserRequest) {
    const { password, age } = createUserDto;
    if (isNaN(Number(age))) {
      const message = `age ${age} is not a number`
      this.logger.error(message);
      throw new BadRequestException(message)
    }
    const message = this.validatePassword(password);
    if (message) {
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return this.usersService.create(createUserDto);
  }

  updateUser(updateUserDto: UpdateUserRequest) {
    try {
    return this.usersService.update(updateUserDto.id, updateUserDto);
    }
    catch(e) {
      this.logger.error(e.message);
      throw(e);
    }
  }

  private getPaginationOrDefault(pagination: PaginationRequest | undefined): PaginationRequest {
    if (!pagination) {
       return {
          limit: 10,
          page: 0,
          sortFields: [{ field: "name", order: SortOrder.ASC }]
       };
    }
 
    if (pagination.limit <= 0 || pagination.page < 0) {
       throw new BadRequestException("Invalid pagination settings.");
    }
 
    if (!pagination.sortFields || pagination.sortFields.length <= 0) {
       pagination.sortFields = [{ field: "name", order: SortOrder.ASC }];
    }
 
    return pagination;
 }
 
  /**
   * Password Validation 
   * Minimum of 8 characters
      At least one uppercase letter
      At least one lowercase letter
      At least one digit
      At least one special character (like @, #, $, etc.)
   * @param password 
   * @returns 
   */
      private validatePassword(password: string): string | null {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasDigit = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        let result = "";
        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowerCase.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasDigit.test(password)) {
            return "Password must contain at least one digit.";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must contain at least one special character.";
        }
        return null;
      }
}
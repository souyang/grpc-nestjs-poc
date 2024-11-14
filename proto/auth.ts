// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: proto/auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export enum SortOrder {
  ASC = 0,
  DESC = 1,
  UNRECOGNIZED = -1,
}

export interface PaginationRequest {
  page: number;
  limit: number;
  sortFields: SortingField[];
}

export interface SortingField {
  field: string;
  order: SortOrder;
}

export interface GetAllUsersRequest {
  pagination: PaginationRequest | undefined;
}

export interface UpdateUserRequest {
  id: string;
  updateFields: UserUpdateFields | undefined;
}

export interface UserUpdateFields {
  age?: number | undefined;
  subscribed?: boolean | undefined;
  socialMedia?: SocialMedia | undefined;
  password?: string | undefined;
}

export interface GetUserByIdRequest {
  id: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  age: number;
}

export interface Status {
  code: number;
  message: string;
}

export interface UsersResponse {
  users: User[];
  metadata: PaginationMetadata | undefined;
}

export interface PaginationMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface UserResponse {
  user: User | undefined;
}

export interface User {
  id: string;
  username: string;
  age: number;
  subscribed: boolean;
  socialMedia?: SocialMedia | undefined;
}

export interface SocialMedia {
  twitterUri: string;
  fbUri: string;
  extraData: { [key: string]: string };
}

export interface SocialMedia_ExtraDataEntry {
  key: string;
  value: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<UserResponse>;

  getAllUsers(request: GetAllUsersRequest): Observable<UsersResponse>;

  getUserById(request: GetUserByIdRequest): Observable<UserResponse>;

  updateUser(request: UpdateUserRequest): Observable<UserResponse>;

  deleteUser(request: GetUserByIdRequest): Observable<Status>;

  streamUsers(request: Observable<PaginationRequest>): Observable<UsersResponse>;
}

export interface UserServiceController {
  createUser(request: CreateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  getAllUsers(request: GetAllUsersRequest): Promise<UsersResponse> | Observable<UsersResponse> | UsersResponse;

  getUserById(request: GetUserByIdRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  updateUser(request: UpdateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  deleteUser(request: GetUserByIdRequest): Promise<Status> | Observable<Status> | Status;

  streamUsers(request: Observable<PaginationRequest>): Observable<UsersResponse>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getAllUsers", "getUserById", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["streamUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

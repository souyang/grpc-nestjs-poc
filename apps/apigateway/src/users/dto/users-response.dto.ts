import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.dto';
import { PaginationMetadata } from './pagination-metadata.dto';

export class UsersResponse {
  @ApiProperty({ type: [User] })
  users: User[];

  @ApiProperty({ type: PaginationMetadata, required: false })
  metadata?: PaginationMetadata;
}

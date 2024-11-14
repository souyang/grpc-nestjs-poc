import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from './pagination-request.dto';

export class GetAllUsersRequest {
  @ApiProperty({ type: PaginationRequest, required: false })
  pagination?: PaginationRequest;
}

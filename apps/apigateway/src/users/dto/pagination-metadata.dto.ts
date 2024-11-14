import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadata {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  itemsPerPage: number;
}

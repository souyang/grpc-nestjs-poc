import { ApiProperty } from '@nestjs/swagger';
import { SortingField } from './sorting-field.dto';

export class PaginationRequest {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ type: [SortingField] })
  sortFields: SortingField[];
}

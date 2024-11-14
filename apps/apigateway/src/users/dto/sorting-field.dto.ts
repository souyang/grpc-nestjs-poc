import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from './sort-order.enum';

export class SortingField {
  @ApiProperty()
  field: string;

  @ApiProperty({ enum: SortOrder })
  order: SortOrder;
}

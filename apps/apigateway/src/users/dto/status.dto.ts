import { ApiProperty } from '@nestjs/swagger';

export class Status {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;
}

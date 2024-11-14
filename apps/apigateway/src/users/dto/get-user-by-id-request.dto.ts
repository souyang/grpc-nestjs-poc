import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdRequest {
  @ApiProperty()
  id: string;
}

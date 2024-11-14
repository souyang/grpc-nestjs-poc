import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  age: number;
}

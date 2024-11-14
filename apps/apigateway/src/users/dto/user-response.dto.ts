import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.dto';

export class UserResponse {
  @ApiProperty({ type: User, required: false })
  user?: User;
}

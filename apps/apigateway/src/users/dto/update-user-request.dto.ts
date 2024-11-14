import { ApiProperty } from '@nestjs/swagger';
import { UserUpdateFields } from './user-update-fields.dto';

export class UpdateUserRequest {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: UserUpdateFields, required: false })
  updateFields?: UserUpdateFields;
}

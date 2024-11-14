import { ApiProperty } from '@nestjs/swagger';
import { SocialMedia } from './social-media.dto';

export class UserUpdateFields {
  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  subscribed?: boolean;

  @ApiProperty({ type: SocialMedia, required: false })
  socialMedia?: SocialMedia;

  @ApiProperty({ required: false })
  password?: string;
}

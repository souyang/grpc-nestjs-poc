import { ApiProperty } from '@nestjs/swagger';
import { SocialMedia } from './social-media.dto';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  subscribed: boolean;

  @ApiProperty({ type: SocialMedia, required: false })
  socialMedia?: SocialMedia;
}

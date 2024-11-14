import { ApiProperty } from '@nestjs/swagger';

export class SocialMedia {
  @ApiProperty()
  twitterUri: string;

  @ApiProperty()
  fbUri: string;

  @ApiProperty()
  extraData: { [key: string]: string };
}

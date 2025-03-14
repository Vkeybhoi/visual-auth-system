import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginArtistDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

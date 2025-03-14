import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

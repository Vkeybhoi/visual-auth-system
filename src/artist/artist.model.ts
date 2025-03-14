import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field()
  id: string;

  @Field()
  artistEmail: string;

  @Field({ nullable: true }) // Allow null
  artistBiometricKey: string | null; // Update type to `string | null`

  @Field()
  artistCreatedAt: Date;

  @Field()
  artistUpdatedAt: Date;
}

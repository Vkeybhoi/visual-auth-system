import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field()
  id: string;

  @Field()
  artistEmail: string;

  @Field({ nullable: true })
  artistBiometricKey: string | null;

  @Field()
  artistCreatedAt: Date;

  @Field()
  artistUpdatedAt: Date;
}

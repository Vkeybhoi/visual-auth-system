import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BiometricLoginDto {
  @Field()
  biometricKey: string;
}

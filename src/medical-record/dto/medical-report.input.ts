import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class MedicalRecordInput {
  @Field(() => Int)
  patientId: number;

  @Field()
  diagnosis: string;

  @Field()
  treatment: string;

  @Field()
  visitDate: Date;
}

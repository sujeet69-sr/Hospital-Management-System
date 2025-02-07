import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateDoctorInput {
  @Field()
  @IsOptional()
  specialization?: string;
}

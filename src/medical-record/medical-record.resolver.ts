import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MedicalRecord } from '../entity/medical-record.entity';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/entity/user.entity';
import { UserDetails } from 'src/auth/interface/user.interface';
import { MedicalRecordInput } from './dto/medical-report.input';
import { MedicalRecordService } from './medical-record.service';

@Resolver(() => MedicalRecord)
@UseGuards(GqlAuthGuard, RolesGuard)
export class MedicalRecordResolver {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Mutation(() => MedicalRecord)
  @Roles(UserRole.DOCTOR)
  async createMedicalRecord(@Args('input') input: MedicalRecordInput) {
    return await this.medicalRecordService.create(
      input.patientId,
      input.diagnosis,
      input.treatment,
      input.visitDate,
    );
  }

  @Query(() => [MedicalRecord], { name: 'medicalRecords', nullable: true })
  async findAllMedicalRecords(@Context() context) {
    const user: UserDetails = context?.req?.user;
    return await this.medicalRecordService.findAll(user);
  }

  @Query(() => MedicalRecord, { name: 'medicalRecord' })
  async findOneMedicalRecord(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const user: UserDetails = context?.req?.user;
    return await this.medicalRecordService.findOne(id, user);
  }
}

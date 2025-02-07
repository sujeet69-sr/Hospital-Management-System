import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Patient } from '../entity/patient.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../entity/user.entity';
import { UserDetails } from 'src/auth/interface/user.interface';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
@UseGuards(GqlAuthGuard, RolesGuard)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => Patient)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  createPatient(
    @Args('name') name: string,
    @Args('contactInfo') contactInfo: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.patientService.create(name, contactInfo, email, password);
  }

  @Query(() => [Patient], { name: 'patients' })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  getAllPatients(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return this.patientService.findAll(skip, take);
  }

  @Query(() => Patient, { name: 'patient' })
  @Roles(UserRole.PATIENT)
  getPatient(@Context() context) {
    const user: UserDetails = context?.req?.user;
    return this.patientService.findOne(user?.userId);
  }

  @Mutation(() => Patient)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  removePatient(@Args('userId', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Doctor } from '../entity';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UserRole } from '../entity';
import { UserDetails } from '../auth/interface/user.interface';
import { DoctorService } from './doctor.service';

@Resolver(() => Doctor)
@UseGuards(GqlAuthGuard, RolesGuard)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Mutation(() => Doctor)
  @Roles(UserRole.ADMIN)
  async createDoctor(
    @Args('createDoctorInput') createDoctorInput: CreateDoctorInput,
  ) {
    return await this.doctorService.create(createDoctorInput);
  }

  @Query(() => [Doctor], { name: 'doctors' })
  @Roles(UserRole.ADMIN, UserRole.PATIENT)
  async findAllDoctors(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return await this.doctorService.findAll(skip, take);
  }

  @Query(() => Doctor, { name: 'doctor' })
  @Roles(UserRole.DOCTOR)
  async findOneDoctor(@Context() context) {
    const user: UserDetails = context?.req?.user;
    return await this.doctorService.findOne(user.userId);
  }

  @Mutation(() => Doctor)
  @Roles(UserRole.DOCTOR)
  async updateDoctor(
    @Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput,
    @Context() context,
  ) {
    const user: UserDetails = context?.req?.user;
    return await this.doctorService.update(updateDoctorInput, user.userId);
  }

  @Mutation(() => Doctor)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  async removeDoctor(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const user: UserDetails = context?.req?.user;
    return await this.doctorService.remove(id, user);
  }
}

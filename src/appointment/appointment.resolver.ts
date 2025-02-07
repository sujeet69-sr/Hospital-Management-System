import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { Appointment } from '../entity/appointment.entity';
import { AppointmentService } from './appointment.service';
import { PubSubService } from '../pubsub/pubsub.service';
import { UserDetails } from 'src/auth/interface/user.interface';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('doctorId', { type: () => Int }) doctorId: number,
    @Args('patientId', { type: () => Int }) patientId: number,
    @Args('appointmentDate') appointmentDate: Date,
    @Context() context,
  ) {
    const user: UserDetails = context?.req?.user;
    const appointment = await this.appointmentService.create(
      doctorId,
      patientId,
      appointmentDate,
      user,
    );
    await this.pubSubService.pubSub.publish('appointmentCreated', {
      appointmentCreated: appointment,
    });
    return appointment;
  }

  @Query(() => [Appointment], { name: 'appointments' })
  async findAllAppointments(@Context() context) {
    const user:UserDetails = context?.req?.user;
    return await this.appointmentService.findAll(user);
  }

  @Query(() => Appointment, { name: 'appointment', nullable: true })
  async findOneAppointment(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const user:UserDetails = context?.req?.user;
    return await this.appointmentService.findOne(id, user);
  }

  @Subscription(() => Appointment, {
    name: 'appointmentCreated',
  })
  async appointmentCreated() {
    this.pubSubService.pubSub.asyncIterableIterator('appointmentCreated');
  }
}

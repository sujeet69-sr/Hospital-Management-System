import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { PubSubModule } from '../pubsub/pubsub.module';
import { Patient } from '../entity';
import { Doctor } from '../entity';
import { User } from '../entity';
import { Appointment } from '../entity';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Patient, Doctor, User]),
    PubSubModule,
  ],
  providers: [
    AppointmentService,
    AppointmentResolver,
    DoctorService,
    PatientService,
    UserService,
  ],
  exports: [AppointmentService],
})
export class AppointmentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entity/patient.entity';
import { PatientResolver } from './patient.resolver';
import { UserModule } from '../user/user.module';
import { User } from '../entity/user.entity';
import { PatientService } from './patient.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User]), UserModule],
  providers: [PatientService, PatientResolver, UserService],
  exports: [PatientService],
})
export class PatientModule {}
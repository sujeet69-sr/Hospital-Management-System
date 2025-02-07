import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from '../entity';
import { MedicalRecordResolver } from './medical-record.resolver';
import { User } from '../entity';
import { Patient } from '../entity';
import { PatientService } from '../patient/patient.service';
import { UserService } from '../user/user.service';
import { MedicalRecordService } from './medical-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, User, Patient])],
  providers: [MedicalRecordService, MedicalRecordResolver, PatientService, UserService],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {}

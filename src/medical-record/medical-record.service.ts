import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../entity/medical-record.entity';
import { UserRole } from '../entity/user.entity';
import { UserDetails } from '../auth/interface/user.interface';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
    private patientService: PatientService,
  ) {}

  async create(
    patientId: number,
    diagnosis: string,
    treatment: string,
    visitDate: Date,
  ): Promise<MedicalRecord> {
    const patientExist = await this.patientService.findById(patientId);

    if (!patientExist) {
      throw new Error('Patient not found');
    }
    const record = this.medicalRecordRepository.create({
      patientId,
      diagnosis,
      treatment,
      visitDate,
    });
    return await this.medicalRecordRepository.save(record);
  }

  async findAll(user: UserDetails): Promise<MedicalRecord[]> {
    const where = {};

    if (user.role === UserRole.PATIENT) {
      const patientExist = await this.patientService.findOne(user.userId);
      where['patientId'] = patientExist?.id;
    }

    return await this.medicalRecordRepository.find({
      where,
      relations: ['patient'],
    });
  }

  async findOne(id: number, user: UserDetails): Promise<MedicalRecord | null> {
    if (user.role === UserRole.PATIENT) {
      const patientExist = await this.patientService.findOne(user.userId);
      if (id !== patientExist?.id) {
        throw new Error('Invalid request');
      }
    }

    return await this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
  }
}

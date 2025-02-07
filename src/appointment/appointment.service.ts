import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entity/appointment.entity';
import { UserRole } from '../entity/user.entity';
import { UserDetails } from '../auth/interface/user.interface';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  async create(
    doctorId: number,
    patientId: number,
    date: Date,
    user: UserDetails,
  ): Promise<Appointment> {
    const doctorExist = await this.doctorService.findById(doctorId);

    if (!doctorExist) {
      throw new Error('Doctor not found');
    }

    const patientExist = await this.patientService.findById(patientId);
    if (!patientExist) {
      throw new Error('Patient not found');
    }

    if (
      (user.role === UserRole.DOCTOR && doctorExist.userId !== user.userId) ||
      (user.role === UserRole.PATIENT && patientExist.userId !== user.userId)
    ) {
      throw new Error('Invalid appointment detail');
    }

    const newAppointment = this.appointmentRepository.create({
      doctorId,
      patientId,
      appointmentDate: date,
    });
    return await this.appointmentRepository.save(newAppointment);
  }

  async findAll(user: UserDetails): Promise<Appointment[]> {
    const where = {};

    if (user.role === UserRole.DOCTOR) {
      const doctorExist = await this.doctorService.findOne(user.userId);
      where['doctorId'] = doctorExist?.id;
    }

    if (user.role === UserRole.PATIENT) {
      const patientExist = await this.patientService.findOne(user.userId);
      where['patientId'] = patientExist?.id;
    }

    return await this.appointmentRepository.find({
      where,
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: number, user: UserDetails): Promise<Appointment | null> {
    const where = { id };

    if (user.role === UserRole.DOCTOR) {
      const doctorExist = await this.doctorService.findOne(user.userId);
      where['doctorId'] = doctorExist?.id;
    }

    if (user.role === UserRole.PATIENT) {
      const patientExist = await this.patientService.findOne(user.userId);
      where['patientId'] = patientExist?.id;
    }

    return this.appointmentRepository.findOne({ where });
  }
}

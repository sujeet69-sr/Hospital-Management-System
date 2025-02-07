import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entity/patient.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserRole } from '../entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly userService: UserService,
  ) {}

  async create(
    name: string,
    contactInfo: string,
    email: string,
    password: string,
  ): Promise<Patient> {
    const existUser = await this.userService.findByEmail(email);

    if (existUser) {
      throw new Error('Patient is already exist with this email');
    }

    const userSaveInput: CreateUserInput = {
      name: name,
      email: email,
      password: password,
      role: UserRole.PATIENT,
    };
    const saveUser = await this.userService.createUser(userSaveInput);

    const createUser = {
      contactInfo,
      userId: saveUser.id,
    };

    const newPatient = this.patientRepository.create(createUser);
    return this.patientRepository.save(newPatient);
  }

  async findAll(skip = 0, take = 10): Promise<Patient[]> {
    return await this.patientRepository.find({ skip, take });
  }

  async findOne(id: number): Promise<Patient | null> {
    return await this.patientRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<Patient> {
    const entity = await this.patientRepository.findOne({
      where: { userId: id },
    });
    if (!entity) {
      throw new Error('Patient not found');
    }
    return await this.patientRepository.remove(entity);
  }

  async findById(id: number): Promise<Patient | null> {
    return await this.patientRepository.findOneBy({
      id,
    });
  }
}

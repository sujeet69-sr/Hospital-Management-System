import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserRole } from '../entity';
import { UserDetails } from '../auth/interface/user.interface';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { UserService } from '../user/user.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly userService: UserService,
  ) {}

  async create(input: CreateDoctorInput): Promise<Doctor> {
    const existUser = await this.userService.findByEmail(input.email);

    if (existUser) {
      throw new Error('Doctor is already exist with this email');
    }

    const userSaveInput: CreateUserInput = {
      name: input.name,
      email: input.email,
      password: input.password,
      role: UserRole.DOCTOR,
    };
    const saveUser = await this.userService.createUser(userSaveInput);

    const createDoctor = {
      specialization: input.specialization,
      userId: saveUser.id,
    };

    const newDoctor = this.doctorRepository.create(createDoctor);
    return await this.doctorRepository.save(newDoctor);
  }

  findAll(skip = 0, take = 10): Promise<Doctor[]> {
    return this.doctorRepository.find({ skip, take });
  }

  findOne(id: number): Promise<Doctor | null> {
    return this.doctorRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Doctor | null> {    
    return await this.doctorRepository.findOneBy({
      id,
    });
  }

  async update(input: UpdateDoctorInput, userId: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { userId: userId },
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    Object.assign(doctor, input);
    return await this.doctorRepository.save(doctor);
  }

  async remove(id: number, user: UserDetails): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    if (user.role === UserRole.DOCTOR && doctor.userId !== user.userId) {
      throw new Error('Invalid doctor');
    }
    return this.doctorRepository.remove(doctor);
  }
}

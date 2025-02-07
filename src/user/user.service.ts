import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminInput, CreateUserInput } from './dto/create-user.input';
import { User, UserRole } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAdmin(createUserInput: CreateAdminInput): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      saltRounds,
    );

    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    return await this.userRepository.save(user);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      saltRounds,
    );

    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}

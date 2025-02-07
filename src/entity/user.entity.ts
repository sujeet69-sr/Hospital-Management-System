import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

export enum UserRole {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => Patient, { nullable: true })
  @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  @Field(() => Doctor, { nullable: true })
  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;
}

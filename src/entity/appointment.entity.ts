import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@ObjectType()
@Entity()
export class Appointment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  doctorId: number;

  @Field(() => Int)
  @Column()
  patientId: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field()
  @Column()
  appointmentDate: Date;

  @Field(() => Doctor, { nullable: true })
  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
}

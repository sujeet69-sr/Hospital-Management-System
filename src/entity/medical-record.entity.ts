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
import { Patient } from './patient.entity';

@ObjectType()
@Entity()
export class MedicalRecord {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  patientId: number;

  @Field()
  @Column()
  diagnosis: string;

  @Field()
  @Column()
  treatment: string;

  @Field()
  @Column()
  visitDate: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, (patient) => patient.medicalRecords, {
    eager: true,
  })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
}

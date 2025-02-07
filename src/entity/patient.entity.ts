import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Appointment } from './appointment.entity';
import { MedicalRecord } from './medical-record.entity';

@ObjectType()
@Entity()
export class Patient {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  contactInfo: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => User)
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Appointment)
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment;

  @Field(() => MedicalRecord)
  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords: MedicalRecord;
}

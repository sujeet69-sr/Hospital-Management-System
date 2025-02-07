import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Appointment } from './appointment.entity';

@ObjectType()
@Entity()
export class Doctor {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  specialization: string;

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
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment;
}

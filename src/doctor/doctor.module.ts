import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../entity/doctor.entity';
import { DoctorResolver } from './doctor.resolver';
import { UserModule } from '../user/user.module';
import { User } from '../entity';
import { DoctorService } from './doctor.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User]), UserModule],
  providers: [DoctorService, DoctorResolver, UserService],
  exports: [DoctorService],
})
export class DoctorModule {}

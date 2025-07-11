import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 import PrismaModule

@Module({
  imports: [PrismaModule], // 👈 add here
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}

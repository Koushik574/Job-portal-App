import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [JobModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

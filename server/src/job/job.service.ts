import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Prisma } from '@prisma/client'; // ✅ Correct import

type JobType = Prisma.JobType; // ✅ Type alias for safety

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateJobDto) {
    const {
      title,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      description,
      requirements,
      responsibilities,
      applicationDeadline,
    } = data;

    const parsedDeadline = new Date(applicationDeadline);
    if (isNaN(parsedDeadline.getTime())) {
      throw new Error('Invalid application deadline date');
    }

    return this.prisma.job.create({
      data: {
        title,
        companyName,
        location,
        jobType: jobType as Prisma.JobType,
        salaryMin,
        salaryMax,
        description,
        requirements,
        responsibilities,
        applicationDeadline: parsedDeadline,
      },
    });
  }

  findAll(query: {
    title?: string;
    location?: string;
    jobType?: JobType;
    salaryMin?: number;
    salaryMax?: number;
  }) {
    const { title, location, jobType, salaryMin, salaryMax } = query;

    return this.prisma.job.findMany({
      where: {
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(jobType && { jobType }),
        ...(salaryMin && { salaryMin: { gte: Number(salaryMin) } }),
        ...(salaryMax && { salaryMax: { lte: Number(salaryMax) } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data: {
        ...data,
        jobType: data.jobType as Prisma.JobType,
      },
    });
  }

  remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobType } from '@prisma/client'; // ✅ Direct enum import

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
        jobType, // ✅ Already type-checked by DTO
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
        jobType: data.jobType, // ✅ No casting needed
      },
    });
  }

  remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}


// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';
// import { Prisma, $Enums } from '@prisma/client'; // 👈 added $Enums
// import { JobType } from '@prisma/client';


// @Injectable()
// export class JobService {
//   constructor(private prisma: PrismaService) {}

//   create(data: CreateJobDto) {
//   const {
//     title,
//     companyName,
//     location,
//     jobType,
//     salaryMin,
//     salaryMax,
//     description,
//     requirements,
//     responsibilities,
//     applicationDeadline,
//   } = data;

//   const parsedDeadline = new Date(applicationDeadline);
//   if (isNaN(parsedDeadline.getTime())) {
//     throw new Error('Invalid application deadline date');
//   }

//   return this.prisma.job.create({
//     data: {
//       title,
//       companyName,
//       location,
//       jobType: jobType as $Enums.JobType, // e.g. Prisma.JobType.FULL_TIME,
//       salaryMin,
//       salaryMax,
//       description,
//       requirements,
//       responsibilities,
//       applicationDeadline: parsedDeadline,
//     },
//   });
// }


// findAll(query: {
//   title?: string;
//   location?: string;
//   jobType?: JobType;
//   salaryMin?: number;
//   salaryMax?: number;
// }) {
//   const { title, location, jobType, salaryMin, salaryMax } = query;

//   return this.prisma.job.findMany({
//     where: {
//       ...(title && { title: { contains: title, mode: 'insensitive' } }),
//       ...(location && { location: { contains: location, mode: 'insensitive' } }),
//       ...(jobType && { jobType }),
//       ...(salaryMin && { salaryMin: { gte: Number(salaryMin) } }),
//       ...(salaryMax && { salaryMax: { lte: Number(salaryMax) } }),
//     },
//     orderBy: { createdAt: 'desc' },
//   });
// }


//   findOne(id: string) {
//     return this.prisma.job.findUnique({
//       where: { id },
//     });
//   }

//   update(id: string, data: UpdateJobDto) {
//     return this.prisma.job.update({
//       where: { id },
//       data: {
//         ...data,
//         jobType: data.jobType as $Enums.JobType, // ✅ correct casting
//       },
//     });
//   }

//   remove(id: string) {
//     return this.prisma.job.delete({
//       where: { id },
//     });
//   }
// }

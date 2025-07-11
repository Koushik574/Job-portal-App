import { IsString, IsOptional, IsDateString, IsIn, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  companyName: string;

  @IsString()
  location: string;

  @IsIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType: string;

  @IsNumber()
  salaryMin: number;

  @IsNumber()
  salaryMax: number;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  responsibilities: string;

  @IsDateString()
  applicationDeadline: string;
}

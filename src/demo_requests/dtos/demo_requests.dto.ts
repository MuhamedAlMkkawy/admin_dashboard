import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

// DTO for creating DemoRequests
export class CreateDemoRequestsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @Matches(/^\d{10,12}$/, { message: 'phone number should be between 10 and 12 digits' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+(\.[a-zA-Z0-9_\-\.]+)*$/)
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  message: string;
}
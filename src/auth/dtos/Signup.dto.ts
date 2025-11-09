import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class SignUpDto{
  @IsString()
  image : string

  @IsString()
  name : string

  @IsEmail()
  email : string

  @IsNumber()
  @Type(() => Number)
  role : number

  @IsString()
  password : string
}
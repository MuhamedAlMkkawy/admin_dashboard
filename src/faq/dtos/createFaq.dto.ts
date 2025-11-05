import { IsArray, IsString } from "class-validator";

export class CreateFaqDto{
  @IsString()
  badge : string;
  
  @IsString()
  title : string

  @IsArray()
  items : string[]
}
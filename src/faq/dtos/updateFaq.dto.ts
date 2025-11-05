import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateFaqDto {
  @IsString()
  @IsOptional()
  badge : string;
  
  @IsString()
  @IsOptional()
  title : string

  @IsArray()
  @IsOptional()
  items : string[]
}
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateClientsSectionDto {
  @IsString()
  @IsOptional()
  name: string;
  
  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsOptional()
  images : string[]
}
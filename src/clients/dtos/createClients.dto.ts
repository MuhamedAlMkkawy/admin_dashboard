import { IsArray, IsString } from "class-validator";

export class CreateClientsSectionDto {
  @IsString()
  name: string;
  
  @IsString()
  title: string;

  @IsArray()
  images : string[];
}
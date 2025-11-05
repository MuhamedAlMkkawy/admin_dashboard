import { IsArray, IsOptional, IsString } from "class-validator";
export class updatePortalsDto {
  
    @IsString()
    @IsOptional()
    badge : string;
  
    @IsString()
    @IsOptional()
    title : string;
  
    @IsString()
    @IsOptional()
    description :string
  
    @IsArray()
    @IsOptional()
    images : string[]
}
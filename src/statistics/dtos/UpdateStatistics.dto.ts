import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class TitleDto {
  @IsString()
  @IsOptional()
  ar : string
  
  @IsString()
  @IsOptional()
  en : string
}


export class UpdateStatisticsDto {
  @IsString()
  @IsOptional()
  image : string
  
  @IsNumber()
  @Type(()=> Number)
  @IsOptional()
  number : number
  
  @IsObject()
  @ValidateNested()
  @Type(() => TitleDto)
  @IsOptional()
  title : TitleDto
}
import { Type } from "class-transformer";
import { IsJSON, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class TitleDto {
  @IsString()
  ar : string

  @IsString()
  en : string
}


export class AddStatisticsDto {
  @IsString()
  image : string

  @IsNumber()
  @Type(()=> Number)
  number : number

  @IsObject()
  @ValidateNested()
  @Type(() => TitleDto)
  title : TitleDto
}
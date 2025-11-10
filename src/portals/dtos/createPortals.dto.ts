import { IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreatePortalsDto {
  @IsString()
  @ValidateNested()
  @Type(() => BadgeDto)
  badge : BadgeDto;

  @IsString()
  @ValidateNested()
  @Type(() => TitleDto)
  title : TitleDto;

  @IsString()
  @ValidateNested()
  @Type(() => DescriptionDto)
  description : DescriptionDto;

  @IsArray()
  images : string[];
}

class BadgeDto {
  @IsString()
  ar : string;

  @IsString()
  en : string;
}

class TitleDto {
  @IsString()
  ar : string;

  @IsString()
  en : string;
}

class DescriptionDto {
  @IsString()
  ar : string;

  @IsString()
  en : string;
}

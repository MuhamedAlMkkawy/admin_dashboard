import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdatePortalsDto {
  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => BadgeDto)
  badge?: BadgeDto;

  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  title?: TitleDto;

  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => DescriptionDto)
  description?: DescriptionDto;

  @IsArray()
  @IsOptional()
  images?: string[];
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

import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTOs ----
export class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

export class FeatureItemDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  icon?: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;
}

// ---- Main DTO ----
export class CreateFeaturesDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  name: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItemDto)
  items: FeatureItemDto[];
}

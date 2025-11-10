import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

// ---- Nested DTOs ----
export class LangStringUpdateDto {
  @IsOptional()
  ar?: string;

  @IsOptional()
  en?: string;
}

export class FeatureItemUpdateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  icon?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  title?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  description?: LangStringUpdateDto;
}

// ---- Main Update DTO ----
export class UpdateFeaturesDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  name?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  title?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  description?: LangStringUpdateDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItemUpdateDto)
  items?: FeatureItemUpdateDto[];
}

import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTOs for update ----
export class LangStringUpdateDto {
  @IsOptional()
  @IsString()
  ar?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

export class FaqItemUpdateDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  question?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  answer?: LangStringUpdateDto;
}

// ---- Main Update DTO ----
export class UpdateFaqDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  badge?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  title?: LangStringUpdateDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemUpdateDto)
  items?: FaqItemUpdateDto[];
}

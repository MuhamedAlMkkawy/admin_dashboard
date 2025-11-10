import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTOs ----
export class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

export class FaqItemDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => LangStringDto)
  question: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  answer: LangStringDto;
}

// ---- Main DTO ----
export class CreateFaqDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  badge: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemDto)
  items: FaqItemDto[];
}

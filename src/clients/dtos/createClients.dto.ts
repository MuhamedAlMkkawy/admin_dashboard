import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTO for language strings ----
export class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

// ---- Main DTO for creating Clients ----
export class CreateClientsDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  name: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}

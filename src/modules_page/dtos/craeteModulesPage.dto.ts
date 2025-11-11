import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// --- Reusable nested DTOs ---
export class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

export class ButtonDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsString()
  link: string;
}

// --- Info Item DTO ---
export class InfoItemDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  badge?: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  content: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];
}

// --- Module Item DTO ---
export class ModuleItemDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  badge?: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  content: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  video?: string;
}

// --- Main DTO for creation ---
export class CreateModulesPageDto {
  @ValidateNested()
  @Type(() => InfoItemDto)
  info_items: InfoItemDto[];

  @ValidateNested()
  @Type(() => ModuleItemDto)
  modules: ModuleItemDto[];
}

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
  @IsOptional()
  @IsString()
  ar?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

export class ButtonDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  title?: LangStringDto;

  @IsOptional()
  @IsString()
  link?: string;
}

// --- Info Item DTO ---
export class InfoItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  badge?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  title?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  content?: LangStringDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons?: ButtonDto[];
}

// --- Module DTO ---
export class ModuleItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  badge?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  title?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  content?: LangStringDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons?: ButtonDto[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  video?: string;
}

// --- Main DTO ---
export class UpdateModulesPageDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoItemDto)
  info_items?: InfoItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ModuleItemDto)
  modules?: ModuleItemDto[];
}

import { Type } from 'class-transformer';
import { 
  IsArray, 
  IsOptional, 
  IsString, 
  ValidateNested, 
  IsNumber 
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

export class InfoItemDto {
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
  video?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class FeatureItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  title?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  description?: LangStringDto;
}

export class UniqueFeatureDto {
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
  description?: LangStringDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItemDto)
  items?: FeatureItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ButtonDto)
  button?: ButtonDto;
}

// --- Main DTO ---
export class UpdateFeaturesPageDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfoItemDto)
  info_items?: InfoItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UniqueFeatureDto)
  unique_features?: UniqueFeatureDto[];
}

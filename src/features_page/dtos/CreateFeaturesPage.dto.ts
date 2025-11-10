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

export class InfoItemDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  badge?: LangStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringDto)
  title?: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  content: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class FeatureItemDto {
  @IsNumber()
  id: number;

  @IsString()
  icon: string;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;
}

export class UniqueFeatureDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  badge: LangStringDto;

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

  @IsOptional()
  @ValidateNested()
  @Type(() => ButtonDto)
  button?: ButtonDto;
}

// --- Main DTO ---
export class CreateFeaturesPageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfoItemDto)
  info_items: InfoItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UniqueFeatureDto)
  unique_features: UniqueFeatureDto[];
}

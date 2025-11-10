import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// ---- Nested DTOs ----

class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

class ButtonDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsString()
  link: string;
}

class HeroSectionDto {

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsString()
  image: string;
}

class GetMoreDto {

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
  @Type(() => ButtonDto)
  buttons: ButtonDto[];
}

class PortalDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  badge: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;

  @IsString()
  image: string;
}

// ---- Main DTO ----

export class CreateHomeDto {
  @ValidateNested()
  @Type(() => HeroSectionDto)
  heroSection: HeroSectionDto;

  @ValidateNested()
  @Type(() => GetMoreDto)
  getMore: GetMoreDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalDto)
  portals: PortalDto[];
}

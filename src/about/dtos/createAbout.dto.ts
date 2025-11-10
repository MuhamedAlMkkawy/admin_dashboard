import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTOs ----
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

export class PortalOfferDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;
}

// ---- Sections DTOs ----
export class HeroSectionDto {
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

export class OffersDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  badge: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalOfferDto)
  portalsOffers: PortalOfferDto[];
}

export class WhyChooseUsDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  badge: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @ValidateNested()
  @Type(() => LangStringDto)
  description: LangStringDto;

  @ValidateNested()
  @Type(() => ButtonDto)
  button: ButtonDto;

  @IsString()
  video: string;
}

export class SchoolnaJourneyDto {
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

// ---- Main CreateAboutDto ----
export class CreateAboutDto {
  @ValidateNested()
  @Type(() => HeroSectionDto)
  heroSection: HeroSectionDto;

  @ValidateNested()
  @Type(() => OffersDto)
  offers: OffersDto;

  @ValidateNested()
  @Type(() => WhyChooseUsDto)
  whyChooseUs: WhyChooseUsDto;

  @ValidateNested()
  @Type(() => SchoolnaJourneyDto)
  schoolnaJourney: SchoolnaJourneyDto;
}

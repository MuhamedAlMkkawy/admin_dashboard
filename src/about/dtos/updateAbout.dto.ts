import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Reusable Sub-DTOs 
export class ButtonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

export class PortalOfferDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// Main Sections 
export class HeroSectionDto {
  @IsString()
  @IsOptional()
  badge?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  @IsOptional()
  buttons?: ButtonDto[];
}

export class OffersDto {
  @IsString()
  @IsOptional()
  badge?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalOfferDto)
  @IsOptional()
  portalsOffers?: PortalOfferDto[];
}

export class WhyChooseUsDto {
  @IsString()
  @IsOptional()
  badge?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => ButtonDto)
  @IsOptional()
  button?: ButtonDto;

  @IsString()
  @IsOptional()
  video?: string;
}

export class SchoolnaJourneyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  @IsOptional()
  buttons?: ButtonDto[];
}

// ---- Main Update DTO -----
export class UpdateAboutDto {
  @ValidateNested()
  @Type(() => HeroSectionDto)
  @IsOptional()
  heroSection?: HeroSectionDto;

  @ValidateNested()
  @Type(() => OffersDto)
  @IsOptional()
  offers?: OffersDto;

  @ValidateNested()
  @Type(() => WhyChooseUsDto)
  @IsOptional()
  whyChooseUs?: WhyChooseUsDto;

  @ValidateNested()
  @Type(() => SchoolnaJourneyDto)
  @IsOptional()
  schoolnaJourney?: SchoolnaJourneyDto;
}

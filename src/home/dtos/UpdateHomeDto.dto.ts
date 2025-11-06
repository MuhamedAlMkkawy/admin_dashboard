import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ButtonDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  link: string;
}

export class HeroSectionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsOptional()
  @IsString()
  image: string;
}

export class GetMoreDto {
  @IsOptional()
  @IsString()
  badge: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  buttons: string[];
}

export class PortalDto {
  @IsOptional()
  @IsString()
  badge: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateHomeDto {
  @ValidateNested()
  @Type(() => HeroSectionDto)
  @IsOptional()
  heroSection: HeroSectionDto;

  @ValidateNested()
  @Type(() => GetMoreDto)
  @IsOptional()
  getMore: GetMoreDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalDto)
  portals: PortalDto[];

}
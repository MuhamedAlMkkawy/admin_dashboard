import {
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ButtonDto {
  @IsString()
  title: string;

  @IsString()
  link: string;
}

export class HeroSectionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsString()
  image: string;
}

export class GetMoreDto {
  @IsString()
  badge: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  buttons: string[];
}

export class PortalDto {
  @IsString()
  badge: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}

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

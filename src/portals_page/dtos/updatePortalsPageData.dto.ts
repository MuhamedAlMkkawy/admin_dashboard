import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PortalButtonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

export class PortalDto {
  @IsNumber()
  @IsOptional()
  id?: number;

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
  @Type(() => PortalButtonDto)
  @IsOptional()
  buttons?: PortalButtonDto[];

  @IsString()
  @IsOptional()
  image?: string;
}

export class MockupDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => PortalButtonDto)
  @IsOptional()
  button?: PortalButtonDto;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdatePortalsPageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalDto)
  @IsOptional()
  portals?: PortalDto[];

  @ValidateNested()
  @Type(() => MockupDto)
  @IsOptional()
  mockup?: MockupDto;
}

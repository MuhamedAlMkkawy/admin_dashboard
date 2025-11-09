import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TitleDto {
  @IsOptional()
  @IsString()
  en?: string;

  @IsOptional()
  @IsString()
  ar?: string;
}

class ButtonDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TitleDto)
  title?: TitleDto;

  @IsOptional()
  @IsString()
  link?: string;
}

class PortalDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  badge?: TitleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  title?: TitleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  description?: TitleDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons?: ButtonDto[];

  @IsOptional()
  @IsString()
  image?: string;
}

class MockupButtonDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  title?: TitleDto;

  @IsOptional()
  @IsString()
  link?: string;
}

class MockupDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  title?: TitleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TitleDto)
  description?: TitleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MockupButtonDto)
  button?: MockupButtonDto;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdatePortalsPageDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalDto)
  portals?: PortalDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => MockupDto)
  mockup?: MockupDto;
}

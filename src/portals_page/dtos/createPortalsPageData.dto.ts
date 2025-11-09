import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TitleDto {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}


class ButtonDto {
  @IsObject()
  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @IsString()
  link: string;
}

class PortalDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => TitleDto)
  badge: TitleDto;

  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @ValidateNested()
  @Type(() => TitleDto)
  description: TitleDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDto)
  buttons: ButtonDto[];

  @IsString()
  image: string;
}

class MockupButtonDto {
  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @IsString()
  link: string;
}

class MockupDto {
  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @ValidateNested()
  @Type(() => TitleDto)
  description: TitleDto;

  @ValidateNested()
  @Type(() => MockupButtonDto)
  button: MockupButtonDto;

  @IsString()
  image: string;
}

export class CreatePortalsPageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortalDto)
  portals: PortalDto[];

  @ValidateNested()
  @Type(() => MockupDto)
  mockup: MockupDto;
}

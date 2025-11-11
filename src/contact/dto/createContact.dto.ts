import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

// ---- Reusable nested DTOs ----
export class LangStringDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

export class ContactInfoDto {
  @IsNumber()
  id : number

  
  @IsString()
  icon: string;

  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsString()
  contact: string;
}

export class ContactsDto {
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
  @Type(() => ContactInfoDto)
  contacts_info: ContactInfoDto[];
}

export class ButtonDto {
  @ValidateNested()
  @Type(() => LangStringDto)
  title: LangStringDto;

  @IsString()
  link: string;
}

export class InfoDto {
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

// ---- Main DTO ----
export class CreateContactDto {
  @ValidateNested()
  @Type(() => ContactsDto)
  contacts: ContactsDto;

  @ValidateNested()
  @Type(() => InfoDto)
  info: InfoDto;
}

import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

// ---- Reusable nested DTOs ----
export class LangStringOptionalDto {
  @IsOptional()
  @IsString()
  ar?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

export class ContactInfoOptionalDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  
  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  title?: LangStringOptionalDto;

  @IsOptional()
  @IsString()
  contact?: string;
}

export class ContactsOptionalDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  badge?: LangStringOptionalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  title?: LangStringOptionalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  description?: LangStringOptionalDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactInfoOptionalDto)
  contacts_info?: ContactInfoOptionalDto[];
}

export class ButtonOptionalDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  title?: LangStringOptionalDto;

  @IsOptional()
  @IsString()
  link?: string;
}

export class InfoOptionalDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  title?: LangStringOptionalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringOptionalDto)
  description?: LangStringOptionalDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonOptionalDto)
  buttons?: ButtonOptionalDto[];
}

// ---- Main Update DTO ----
export class UpdateContactDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactsOptionalDto)
  contacts?: ContactsOptionalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoOptionalDto)
  info?: InfoOptionalDto;
}

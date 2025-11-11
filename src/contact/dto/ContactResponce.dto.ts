import { Expose, Type } from 'class-transformer';

// ---- Reusable nested response DTOs ----
export class LangStringResponseDto {
  @Expose()
  ar: string;

  @Expose()
  en: string;
}

export class ContactInfoResponseDto {
  @Expose()
  id: number;

  @Expose()
  icon: string;

  @Expose()
  @Type(() => LangStringResponseDto)
  title: LangStringResponseDto;

  @Expose()
  contact: string;
}

export class ContactsResponseDto {
  @Expose()
  @Type(() => LangStringResponseDto)
  badge: LangStringResponseDto;

  @Expose()
  @Type(() => LangStringResponseDto)
  title: LangStringResponseDto;

  @Expose()
  @Type(() => LangStringResponseDto)
  description: LangStringResponseDto;

  @Expose()
  @Type(() => ContactInfoResponseDto)
  contacts_info: ContactInfoResponseDto[];
}

export class ButtonResponseDto {
  @Expose()
  @Type(() => LangStringResponseDto)
  title: LangStringResponseDto;

  @Expose()
  link: string;
}

export class InfoResponseDto {
  @Expose()
  @Type(() => LangStringResponseDto)
  title: LangStringResponseDto;

  @Expose()
  @Type(() => LangStringResponseDto)
  description: LangStringResponseDto;

  @Expose()
  @Type(() => ButtonResponseDto)
  buttons: ButtonResponseDto[];
}

// ---- Main Response DTO ----
export class ContactResponseDto {
  @Expose()
  _id: string; // Exposed as string instead of ObjectId for JSON responses

  @Expose()
  @Type(() => ContactsResponseDto)
  contacts: ContactsResponseDto;

  @Expose()
  @Type(() => InfoResponseDto)
  info: InfoResponseDto;
}

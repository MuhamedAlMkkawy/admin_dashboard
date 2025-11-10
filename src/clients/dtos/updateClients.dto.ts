import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

// ---- Nested DTO for optional language strings ----
export class LangStringUpdateDto {
  @IsOptional()
  @IsString()
  ar?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

// ---- Main DTO for updating Clients ----
export class UpdateClientsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  name?: LangStringUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangStringUpdateDto)
  title?: LangStringUpdateDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

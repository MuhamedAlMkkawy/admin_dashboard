import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FeatureItem {
  @IsNumber()
  id?: number;

  @IsString()
  icon?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateFeatureDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItem)
  items: FeatureItem[];
}

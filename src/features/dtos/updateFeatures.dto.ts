import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FeatureItem {
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  icon?: string;
  
  @IsOptional()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateFeatureDto {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsString()
  description: string;
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItem)
  items: FeatureItem[];
}

import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class FeatureItem {
  @IsString()
  icon?: string;

  @IsString()
  title: string;

  @IsString()
  text: string;
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
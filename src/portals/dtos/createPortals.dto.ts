import { IsArray, IsString } from "class-validator";

export class CreatePortalsDto {
  @IsString()
  badge : string;

  @IsString()
  title : string;

  @IsString()
  description :string

  @IsArray()
  images : string[]
}
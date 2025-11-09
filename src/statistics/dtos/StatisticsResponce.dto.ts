import { Expose } from "class-transformer";

export class StatisticsResponceDto {
  @Expose()
  _id : string

  @Expose()
  image : string


  @Expose()
  number : number


  @Expose()
  title : string
}
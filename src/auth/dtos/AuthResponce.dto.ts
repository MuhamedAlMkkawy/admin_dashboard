import { Expose } from "class-transformer";

export class AuthResponce {
  @Expose()
  _id : string

  @Expose()
  image : string

  @Expose()
  name : string

  @Expose()
  email : string

  @Expose()
  role : number

  @Expose()
  token : string
}
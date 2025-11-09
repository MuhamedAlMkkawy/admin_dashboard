import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Users {
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  image : string

  @Column()
  name : string

  @Column()
  email : string

  @Column()
  token : string


  @Column()
  role : number

  @Column()
  password : string
}
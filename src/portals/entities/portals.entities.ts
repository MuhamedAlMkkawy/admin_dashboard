import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Portals {
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  badge : string

  @Column()
  title : string

  @Column()
  description : string

  @Column()
  images : string[]
}
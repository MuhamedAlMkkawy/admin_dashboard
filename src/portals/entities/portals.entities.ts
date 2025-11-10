import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Portals {
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  badge : {ar : string , en : string}

  @Column()
  title : {ar : string , en : string}

  @Column()
  description : {ar : string , en : string}

  @Column()
  images : string[]
}
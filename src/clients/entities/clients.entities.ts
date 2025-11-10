import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Clients {
  @ObjectIdColumn()
  _id : ObjectId;


  @Column()
  name : {ar : string , en : string };

  @Column()
  title : {ar : string , en : string };

  @Column()
  images : string[];
}
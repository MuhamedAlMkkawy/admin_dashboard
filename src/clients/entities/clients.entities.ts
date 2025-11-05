import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Clients {
  @ObjectIdColumn()
  _id : ObjectId;


  @Column()
  name : string;

  @Column()
  title : string;

  @Column()
  images : string[];
}
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Statistics {
  @ObjectIdColumn()
  _id : ObjectId;


  @Column()
  image : string;


  @Column()
  number : number;


  @Column()
  title : string;
}
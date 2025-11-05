import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Faq{
  @ObjectIdColumn()
  _id : ObjectId;

  @Column()
  badge : string;

  @Column()
  title : string

  @Column()
  items : string[]
}
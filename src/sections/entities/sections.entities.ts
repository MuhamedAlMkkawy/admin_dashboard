import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Sections {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  content: string;

  x
}
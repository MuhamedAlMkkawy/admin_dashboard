import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;


  @Column()
  name : string

}
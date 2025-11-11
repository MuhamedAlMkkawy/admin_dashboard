import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class DemoRequests {
  @ObjectIdColumn()
  _id : ObjectId
  @Column()
  name : string
  @Column()
  subject : string
  @Column()
  phone : string
  @Column()
  email : string
  @Column()
  message : string
}
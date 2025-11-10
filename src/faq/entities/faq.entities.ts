import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Faq{
  @ObjectIdColumn()
  _id : ObjectId;

  @Column()
  badge : {ar : string , en : string};

  @Column()
  title : {ar : string , en : string}

  @Column()
  items : {
    id : number 
    question : {ar : string , en : string}
    answer : {ar : string , en : string}
  }[]
}
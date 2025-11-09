import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class PortalsPage {
  @ObjectIdColumn()
  _id : ObjectId;

  @Column()
  portals : {
    id : number
    badge : {en : string , ar : string}
    title : {en : string , ar :string}
    description : {en : string , ar :string}
    buttons : {title : {en : string , ar :string} ,link : {en : string , ar :string}}[]
    image : string
  }[]

  @Column()
  mockup : {
    title : {en : string , ar :string}
    description : {en : string , ar :string}
    button : {title : {en : string , ar :string} , link : string}
    image : string
  }
}
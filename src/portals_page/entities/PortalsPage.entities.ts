import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class PortalsPage {
  @ObjectIdColumn()
  _id : ObjectId;

  @Column()
  portals : {
    id : number
    badge : string
    title : string
    description : string
    buttons : {title : string ,link : string}[]
    image : string
  }[]

  @Column()
  mockup : {
    title : string
    description : string
    button : {title : string , link : string}
    image : string
  }
}
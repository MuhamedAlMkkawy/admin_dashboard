import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Contact {
  @ObjectIdColumn()
  _id : ObjectId


  @Column()
  contacts : {
    badge : {ar : string , en : string}
    title : {ar : string , en:string}
    description : {ar : string , en : string}
    contacts_info : {
      id : number
      icon : string,
      title : {ar : string , en : string},
      contact : string
    }[]
  }


  @Column()
  info : {
    title : {ar : string , en : string}
    description : {ar : string , en : string}
    buttons : {title : {ar : string , en : string} , link : string}[]
  }
}
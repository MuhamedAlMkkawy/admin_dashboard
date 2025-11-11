import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class ModulesPage {
  @ObjectIdColumn()
  _id : ObjectId


  @Column()
  info_items : {
    id : number
    badge? : {ar : string , en : string}
    title : {ar : string , en : string}
    content : {ar : string , en : string}
    buttons : {title : {ar : string , en : string} , link : string}[]
  }[]

  @Column() 
  modules : {
    id : number
    badge? : {ar : string , en : string}
    title : {ar : string , en : string}
    content : {ar : string , en : string}
    buttons : {title : {ar : string , en : string} , link : string}[]
    image? : string
    video? : string
  }[]
}
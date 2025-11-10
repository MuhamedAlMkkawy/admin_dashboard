import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class FeaturesPage{
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  info_items : {
    badge? : {ar : string , en : string}
    title? : {ar : string , en : string}
    content : {ar : string , en : string}
    buttons : {title : {ar : string , en : string} , link : string}[]
    video? : string
    image? : string
  }[]

  @Column()
  unique_features : {
    badge : {ar : string , en : string}
    title : {ar : string , en : string}
    description : {ar : string , en : string}
    items : {
      id : number
      icon : string
      title : {ar : string , en : string}
      description : {ar : string , en : string}
    }[]
    button? : {title : {ar : string , en : string} , link : string}
  }[]
}
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class About {
  @ObjectIdColumn()
  _id : ObjectId

  
  @Column()
  heroSection : {
    badge : {ar : string , en : string}
    title : {ar : string , en : string}
    description : {ar : string , en : string}
    buttons : {title : {ar : string , en : string} , link : string}[]
  }

  @Column()
  offers : {
    badge : {ar : string , en : string}
    title : {ar : string , en : string}
    portalsOffers : {title : {ar : string , en : string} , description : {ar : string , en : string}}[]
  }
  
  @Column()
  whyChooseUs : {
    badge : {ar : string , en : string}
    title : {ar : string , en : string}
    description : {ar : string , en : string}
    button : {title : {ar : string , en : string} , link : string}
    video : string
  }
  
  @Column()
  schoolnaJourney : {
    title : {ar : string , en:string}
    description : {ar : string , en:string} 
    buttons : {title : {ar : string , en:string} , link : string}[]
  }
}
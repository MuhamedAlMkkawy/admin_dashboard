import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class About {
  @ObjectIdColumn()
  _id : ObjectId

  
  @Column()
  heroSection : {
    badge : string
    title : string
    description : string
    buttons : {title : string , link : string}[]
  }

  @Column()
  offers : {
    badge : string
    title : string
    portalsOffers : {title : string , description : string}[]
  }
  
  @Column()
  whyChooseUs : {
    badge : string
    title : string
    description : string
    button : {title : string , link : string}
    video : string
  }
  
  @Column()
  schoolnaJourney : {
    title : string
    description : string 
    buttons : {title : string , link : string}[]
  }
}
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Home {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  heroSection: {
    id : number
    title: {ar : string , en : string};
    description: {ar : string , en : string};
    buttons: { title: {ar : string , en : string}; link: string }[];
    image: string;
  };

  @Column()
  getMore: {
    id : number
    badge: {ar : string , en : string};
    title: {ar : string , en : string};
    description: {ar : string , en : string};
    buttons: { title: {ar : string , en : string}; link: string }[];
  };

  @Column()
  portals: {
    id : number
    badge: {ar : string , en : string};
    title: {ar : string , en : string};
    description: {ar : string , en : string};
    image: string;
  }[];
}

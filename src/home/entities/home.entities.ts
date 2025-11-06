import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Home {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  heroSection: {
    title: string;
    description: string;
    buttons: { title: string; link: string }[];
    image: string;
  };

  @Column()
  getMore: {
    badge: string;
    title: string;
    description: string;
    buttons: string[];
  };

  @Column()
  portals: {
    badge: string;
    title: string;
    description: string;
    image: string;
  }[];
}

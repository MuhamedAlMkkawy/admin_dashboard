import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Features {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('array-json') // For MongoDB, you can also use 'simple-json'
  items: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;

}
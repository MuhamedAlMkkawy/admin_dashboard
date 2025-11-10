import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Features {
  @ObjectIdColumn()
  _id: ObjectId;
  
  @Column()
  name: {ar : string , en : string};

  @Column()
  title: {ar : string , en : string};

  @Column()
  description: {ar : string , en : string};

  // Use 'simple-json' or 'json' instead of 'array-json'
  @Column()
  items: Array<{
    id: number;
    icon?: {ar : string , en : string};
    title: {ar : string , en : string};
    description: {ar : string , en : string};
  }>;
}

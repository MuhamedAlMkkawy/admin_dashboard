import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

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

  // Use 'simple-json' or 'json' instead of 'array-json'
  @Column({ type: 'simple-json', nullable: true })
  items: Array<{
    id: number;
    icon?: string;
    title: string;
    description: string;
  }>;
}

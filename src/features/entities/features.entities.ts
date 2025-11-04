import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Features {
  @PrimaryGeneratedColumn()
  id: number;

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

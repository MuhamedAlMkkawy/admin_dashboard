import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Portals {
  @PrimaryGeneratedColumn()
  id : number

  @Column()
  badge : string

  @Column()
  title : string

  @Column()
  description : string

  @Column()
  images : string[]
}
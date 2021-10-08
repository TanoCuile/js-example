import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'tags',
})
export class Tag {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'name',
    type: String,
    length: 32,
  })
  name!: string;
}

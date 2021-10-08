import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Note } from './Note';
import { Tag } from './Tag';
import { User } from './User';

@Entity({
  name: 'expenses',
})
export class Expense {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'purpose',
    type: String,
    length: 32,
  })
  purpose!: string;

  @Column({
    name: 'amount',
    type: 'float4',
  })
  amount!: number;

  @Column({
    name: 'time',
    type: 'int8',
  })
  time!: number;

  @ManyToMany((type) => Tag, { eager: true })
  @JoinTable({
    name: 'expense_tags',
    joinColumn: { name: 'expense_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Note, (note) => note.expense, { eager: true })
  notes: Note;

  @ManyToOne((type) => User, (user) => user.expenses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;
}

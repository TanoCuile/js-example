import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expense } from './Expense';
import { User } from './User';

@Entity({
  name: 'notes',
})
export class Note {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'text',
    type: 'text',
  })
  text!: string;

  @ManyToOne(() => Expense)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

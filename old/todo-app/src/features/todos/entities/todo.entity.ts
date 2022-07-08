import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity({
  name: 'todos'
})
export class Todo {

  @PrimaryGeneratedColumn ()
  id: number;

  @Column()
  text: string;

  @Column({
    name: 'is_done'
  })
  isDone: boolean;
}

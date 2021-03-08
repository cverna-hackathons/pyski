import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  playerIndex!: number;

  @Column()
  grid!: string;

  @ManyToOne(_ => Match, match => match.games)
  match?: Match;

  // @Column({
  //   type: 'float'
  // })
  // height!: number;

  // @Column({
  //   type: 'enum',
  //   enum: Unit,
  //   default: Unit.in
  // })
  // unit!: Unit;
}

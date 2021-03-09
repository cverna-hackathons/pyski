import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column
} from 'typeorm';
import { Game } from './Game';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  numOfGames!: number;

  @Column()
  winningLength!: number;

  @Column()
  timeout!: number;

  @Column()
  maxRounds!: number;

  @Column()
  gridWidth!: number;

  @Column()
  gridHeight!: number;

  @OneToMany(_ => Game, game => game.match)
  games!: Game[];
}


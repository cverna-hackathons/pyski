import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne
} from 'typeorm';
import { Game } from './Game';
import { Player } from './Player';

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

  @ManyToOne(_ => Player, player => player.matchesAsPlayerA)
  playerA!: Player;

  @ManyToOne(_ => Player, player => player.matchesAsPlayerB)
  playerB!: Player;
}


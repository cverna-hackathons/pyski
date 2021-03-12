import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Game } from './Game';
import { Player } from './Player';

@Entity()
@ObjectType()
export class Match extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Number)
  @Column()
  numOfGames!: number;

  @Field(() => Number)
  @Column()
  winningLength!: number;

  @Field(() => Number)
  @Column()
  timeout!: number;

  @Field(() => Number)
  @Column()
  maxRounds!: number;

  @Field(() => Number)
  @Column()
  gridWidth!: number;

  @Field(() => Number)
  @Column()
  gridHeight!: number;

  @Field(() => [Game])
  @OneToMany(_ => Game, game => game.match)
  games!: Game[];

  @ManyToOne(_ => Player, player => player.matchesAsPlayerA)
  playerA!: Player;

  @ManyToOne(_ => Player, player => player.matchesAsPlayerB)
  playerB!: Player;

  get gridLen(): number {
    return (this.gridHeight * this.gridWidth);
  }

  async createFirstGame(): Promise<Game> {
    const match = this;
    const game = Game.create({
      gameIndex: 0,
      playerIndex: 0,
      match,
    });
    await game.save();
    await game.initFirstMove();
    return game;
  }
}

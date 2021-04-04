import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { createGrid, Grid, makeMoves } from '../grid/grid';
import { Match } from '../match/Match.entity';
import { Move } from './Move.entity';
import { Player } from '../player/Player.entity';
import { PLAYER_TYPES } from '../player/playerLoader';
import { Result } from './Result.entity';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  gameIndex!: number;

  @Field(() => Match)
  @ManyToOne(_ => Match, match => match.games, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  match!: Match;

  @Field(() => [Move])
  @OneToMany(_ => Move, move => move.game)
  moves!: Move[];

  @Field(() => Result)
  @OneToOne(_ => Result, result => result.game)
  result!: Result;

  @Field(() => [[ Number ]])
  get grid(): Grid {
    return makeMoves(
      createGrid(this.match.gridWidth, this.match.gridHeight),
      this.moves,
      this.firstPlayerIndex
    );
  }

  get firstPlayerIndex(): number {
    return (this.gameIndex % 2);
  }

  get firstPlayerToMove(): Player {
    return (
      this.firstPlayerIndex === 0
        ? this.match.playerA
        : this.match.playerB
    )
  }

  @Field(() => Number)
  get currentRound() {
    return Math.floor(this.moves.length / 2);
  }

  get roundsExceeded() {
    return this.currentRound > this.match.maxRounds
  }

  @Field(() => Number)
  get nextPlayerIndex(): number {
    return ((this.firstPlayerIndex + this.moves.length) % 2);
  }

  @Field(() => Number)
  get nextOpponentIndex(): number {
    return ((this.nextPlayerIndex + 1) % 2);
  }

  @Field(() => Number)
  get nextOpponentValue(): number {
    return (this.nextOpponentIndex + 1);
  }

  @Field(() => Number)
  get nextPlayerValue(): number {
    return (this.nextPlayerIndex + 1);
  }

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Player)
  get nextPlayer(): Player {
    return this.nextPlayerIndex === 0
      ? this.match.playerA
      : this.match.playerB;
  }

  @Field(() => Boolean)
  get nextPlayerIsInteractive(): boolean {
    return (this.nextPlayer.type === PLAYER_TYPES.INTERACTIVE);
  }

  @Field(() => Boolean)
  get isFinished(): boolean {
    return (
      (this.result?.faultOfPlayer && this.result?.faultOfPlayer > 0) ||
      (this.result?.winner !== undefined && this.result?.winner >= 0)
    );
  }

  @Field(() => Number, { nullable: true })
  get winner(): number | undefined {
    return this.result?.winner;
  }
  @Field(() => Number, { nullable: true })
  get faultOfPlayer(): number | undefined {
    return this.result?.faultOfPlayer;
  }
  @Field(() => Boolean)
  get isTied(): boolean {
    return (this.result?.winner === 0);
  }

  @Field(() => String)
  get statusLabel(): string {
    return this.isFinished ? 'Finished' : 'In progress';
  }
}

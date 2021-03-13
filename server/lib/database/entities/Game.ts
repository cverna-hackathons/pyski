import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { createGrid, Grid, makeMoves } from '../../grid/grid';
import { Match } from './Match';
import { Move } from './Move';
import { Player } from './Player';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  gameIndex!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  winner?: number;

  @Field(() => Match)
  @ManyToOne(_ => Match, match => match.games, { nullable: false })
  match!: Match;

  @Field(() => [Move])
  @OneToMany(_ => Move, move => move.game)
  moves!: Move[];

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

  @Field(() => Player)
  get nextPlayer(): Player {
    return this.nextPlayerIndex === 0
      ? this.match.playerA
      : this.match.playerB;
  }

  @Field(() => Boolean)
  get isFinished(): boolean {
    return (
      this.faultOfPlayer !== null ||
      this.winner !== null
    );
  }

  @Field(() => Boolean)
  get isTied(): boolean {
    return (this.winner === 0);
  }

  @Field(() => String)
  get statusLabel(): string {
    return this.isFinished ? 'Finished' : 'In progress';
  }
}

import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { makePlayerMove } from '../../game/play';
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

  @Field()
  @Column()
  playerIndex!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  winner?: number;

  @Field(() => Match)
  @ManyToOne(_ => Match, match => match.games)
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
  get nextPlayerIndex(): number {
    return ((this.firstPlayerIndex + this.moves.length) % 2);
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
      this.winner !== null ||
      this.moves.length >= this.match.gridLen ||
      (this.moves.length / 2) > this.match.maxRounds
    );
  }

  @Field(() => String)
  get statusLabel(): string {
    return this.isFinished ? 'Finished' : 'In progress';
  }

  async promptNextMove(): Promise<boolean> {
    const match = await Match.findOne({
      where: { id: this.match.id },
      relations: [ 'playerA', 'playerB' ],
    })
    const player = (
      this.firstPlayerIndex === 0
        ? match?.playerA
        : match?.playerB
    )
    let moved = false;

    if (player) {
      console.log('initFirstMove', player);
      moved = await makePlayerMove(player, this.id);
    }
    return moved
  }
}

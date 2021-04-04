import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Game } from '../game/Game.entity';
import { Player } from '../player/Player.entity';
import { User } from '../user/User.entity';

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Game])
  @OneToMany(_ => Game, game => game.match)
  games!: Game[];

  @Field(() => Player)
  @ManyToOne(_ => Player, player => player.matchesAsPlayerA, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  playerA!: Player;

  @Field(() => Player)
  @ManyToOne(_ => Player, player => player.matchesAsPlayerB, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  playerB!: Player;

  @Field(() => User)
  @ManyToOne(_ => User, author => author.matches, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author!: User;

  get gridLen(): number {
    return (this.gridHeight * this.gridWidth);
  }

  @Field(() => Boolean)
  get isFinished(): boolean {
    return (
      this.games.length >= this.numOfGames &&
      this.games.every(game => game.isFinished)
    );
  }

  @Field(() => Number)
  get playerAScore(): number {
    return this.games.filter(game => (
      game.result?.winner === 1
    )).length;
  }

  @Field(() => Number)
  get playerBScore(): number {
    return this.games.filter(
      game => game.result?.winner === 2
    ).length;
  }
}

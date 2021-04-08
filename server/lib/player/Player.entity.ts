import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn
} from 'typeorm';
import { PLAYER_TYPES } from './playerLoader';
import { Match } from '../match/Match.entity';
import { Move } from '../game/Move.entity';

@Entity()
@ObjectType()
export class Player extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column({
    enum: PLAYER_TYPES,
    type: 'enum',
  })
  type!: PLAYER_TYPES;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  path!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(_ => Match, match => match.playerA)
  matchesAsPlayerA!: Match[];

  @OneToMany(_ => Match, match => match.playerB)
  matchesAsPlayerB!: Match[];

  @OneToMany(_ => Move, move => move.player)
  moves!: Move[];

  private nextInteractiveMove?: number[];

  get hasInteractiveMove(): boolean {
    return (
      this.type === PLAYER_TYPES.INTERACTIVE &&
      !!this.nextInteractiveMove
    );
  }

  assignNextInteractiveMove(x: number, y: number) {
    this.nextInteractiveMove = [ x, y ];
  }

  async playInteractiveMove() {
    if (!this.nextInteractiveMove) {
      throw new Error(`Interactive move wasn't defined!`);
    }

    const move = [ ...this.nextInteractiveMove ];
    this.nextInteractiveMove = undefined;
    return move;
  }

}

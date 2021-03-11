import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { Match } from './Match';
import { Move } from './Move';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Number)
  @Column()
  gameIndex!: number;

  @Field(() => Number)
  @Column()
  playerIndex!: number;

  @Field(() => Number)
  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Field(() => Number)
  @Column({ nullable: true })
  winner?: number;

  @ManyToOne(_ => Match, match => match.games)
  match!: Match;

  @OneToMany(_ => Move, move => move.game)
  moves!: Move[];

  get firstPlayerIndex() {
    return (this.gameIndex % 2);
  }
}

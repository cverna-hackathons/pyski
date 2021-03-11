import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Match } from './Match';

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

  get firstPlayerIndex() {
    return (this.gameIndex % 2);
  }
}

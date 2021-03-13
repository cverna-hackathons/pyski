import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Game } from './Game';
import { Player } from './Player';

@Entity()
@ObjectType()
export class Move extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Number)
  @Column()
  moveIndex!: number;

  @Field()
  @Column()
  x!: number;

  @Field()
  @Column()
  y!: number;

  @Field(() => Player)
  @ManyToOne(_ => Player, player => player.moves, { nullable: false })
  player!: Player;

  @Field(() => Game)
  @ManyToOne(_ => Game, game => game.moves, { nullable: false })
  game!: Game;
}

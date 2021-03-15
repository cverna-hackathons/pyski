import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Game } from './Game.entity';
import { Player } from '../player/Player.entity';

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
  @ManyToOne(_ => Player, player => player.moves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  player!: Player;

  @Field(() => Game)
  @ManyToOne(_ => Game, game => game.moves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  game!: Game;
}

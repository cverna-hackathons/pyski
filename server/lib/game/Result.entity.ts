import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Game } from './Game.entity';

@Entity()
@ObjectType()
export class Result extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  winner?: number;

  @Field(() => Game)
  @OneToOne(_ => Game, game => game.result, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  game!: Game;
}

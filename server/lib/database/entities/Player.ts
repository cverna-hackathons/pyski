import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm';
import { PLAYER_TYPES } from '../../players/playerLoader';
import { Match } from './Match';

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
  path?: string;

  @OneToMany(_ => Match, match => match.playerA)
  matchesAsPlayerA!: Match[];

  @OneToMany(_ => Match, match => match.playerB)
  matchesAsPlayerB!: Match[];
}

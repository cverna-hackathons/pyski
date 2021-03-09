import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { PLAYER_TYPES } from '../../players/playerLoader';
import { Match } from './Match';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    enum: PLAYER_TYPES,
    type: 'enum',
  })
  type!: PLAYER_TYPES;

  @Column()
  name!: string;

  @Column()
  path?: string;

  @OneToMany(_ => Match, match => match.playerA)
  matchesAsPlayerA!: Match[];

  @OneToMany(_ => Match, match => match.playerB)
  matchesAsPlayerB!: Match[];
}


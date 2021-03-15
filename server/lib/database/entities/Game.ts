import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  gameIndex!: number;

  @Column()
  playerIndex!: number;

  @Column()
  grid!: string;

  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Column({ nullable: true })
  winner?: number;

  @ManyToOne(_ => Match, match => match.games)
  match!: Match;

  get firstPlayerIndex() {
    return (this.gameIndex % 2);
  }
}

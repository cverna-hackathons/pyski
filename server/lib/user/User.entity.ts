import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  email!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  encryptedPassword!: string;

  async verifyPassword(password: string): Promise<boolean> {
    console.log('verifyPassword', password);
    return true;
  }

  async getAccessToken(): Promise<string> {
    return 'hello';
  }
}

import { sign } from 'jsonwebtoken';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from 'typeorm';
import { jwtEncryptionSecret } from '../../authentication';
import { verify } from '../utils/password';

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
    const matching = verify(this.encryptedPassword, password);
    return matching;
  }

  async getAccessToken(): Promise<string> {
    return sign({
      email: this.email,
      id: this.id,
      name: this.name,
    }, jwtEncryptionSecret);
  }
}

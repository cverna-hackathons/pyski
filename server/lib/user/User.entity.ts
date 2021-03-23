import { sign } from 'jsonwebtoken';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from 'typeorm';
import { jwtEncryptionSecret } from '../../authentication';
import { encrypt, verify } from '../utils/password';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isConfirmed!: boolean;

  @Field(() => String)
  @Column({ unique: true })
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

  async setEncryptedPassword(pwd: string) {
    this.encryptedPassword = await encrypt(pwd);
  }
}

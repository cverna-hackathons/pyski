import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from 'type-graphql';
import { TOPIC } from '../topics';
import { User } from './User.entity';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class UserLoginInput {
  @IsEmail()
  @Field()
  email!: string;

  @Length(5, 128)
  @Field()
  password!: string;
}

@InputType()
export class UserSignupInput extends UserLoginInput {
  @Length(4, 64)
  @Field()
  name!: string;
}

interface AuthenticatedRequestContext {
  user: User;
};

@Resolver(User)
export class UserResolver {
  @Mutation(() => String)
  async loginUser(
    @Arg('input') input: UserLoginInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<string> {
    const user = await User.findOne({
      where: { email: input.email }
    });

    pubsub.publish(TOPIC.LOGIN_ATTEMPT, input.email);
    if (user) {
      const passwordMatch = await user.verifyPassword(input.password);

      if (passwordMatch) {
        const token = await user.getAccessToken();
        return token;
      }
    }
    return '';
  }

  @Mutation(() => Boolean)
  async signupUser(
    @Arg('input') input: UserSignupInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<boolean> {
    console.log('signupUser', input);
    const user = await User.findOne({
      where: { email: input.email }
    });
    if (user) {
      throw new Error('User already exists.');
    }
    const newUser = User.create({
      email: input.email,
      name: input.name,
    });

    await newUser.setEncryptedPassword(input.password);
    await newUser.save();
    pubsub.publish(TOPIC.SIGNUP, input.email);
    return true;
  }

  @Authorized()
  @Query(() => User)
  currentUser(
    @Ctx() context: AuthenticatedRequestContext
  ): User | null {
    return context.user;
  }
}

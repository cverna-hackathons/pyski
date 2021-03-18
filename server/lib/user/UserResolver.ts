import {
  Arg,
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

  @Length(5, 100)
  @Field()
  password!: string;
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

  @Query(() => User)
  currentUser(
    @Ctx() context: AuthenticatedRequestContext
  ): User {
    return context.user;
  }
}

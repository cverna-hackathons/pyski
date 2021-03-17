import {
  Arg,
  Field,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
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

@Resolver(User)
export class UserResolver {
  @Mutation(() => String)
  async loginUser(
    @Arg('input') input: UserLoginInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<string> {
    console.log('mutation loginUser', input);
    const user = await User.findOne({
      where: { email: input.email }
    });

    pubsub.publish(TOPIC.LOGIN_ATTEMPT, input);
    if (user) {
      console.log(user);
    }

    return ''
  }
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/model/post.model';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}

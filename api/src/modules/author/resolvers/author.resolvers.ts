import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from '../model/author.model';
import { Post } from '../../post/model/post.model';
import { FindAuthorByIdService } from '../use-cases/find-author-by-id.service';
import { FindPostsService } from '../../post/use-cases/find-posts.service';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private readonly findAuthorByIdService: FindAuthorByIdService,
    private readonly findPostsService: FindPostsService,
  ) {}

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.findAuthorByIdService.execute(id);
  }

  @ResolveField('posts', () => [Post])
  async getPosts(@Parent() author: Author) {
    const { id: authorId } = author;
    return this.findPostsService.execute({ authorId });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entity/author.entity';
import { FindAuthorByIdService } from './use-cases/find-author-by-id.service';
import { PostModule } from '../post/post.module';
import { AuthorsResolver } from './resolvers/author.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), PostModule],
  providers: [FindAuthorByIdService, AuthorsResolver],
})
export class AuthorModule {}

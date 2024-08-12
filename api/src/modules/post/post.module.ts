import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { FindPostsService } from './use-cases/find-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FindPostsService],
  exports: [FindPostsService],
})
export class PostModule {}

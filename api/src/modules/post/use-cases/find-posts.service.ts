import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

type FindPostsParams = FindOptionsWhere<Post> | FindOptionsWhere<Post>[];

@Injectable()
export class FindPostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  execute(where: FindPostsParams) {
    return this.postRepository.findBy(where);
  }
}

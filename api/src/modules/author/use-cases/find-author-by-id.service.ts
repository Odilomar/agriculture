import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from '../entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAuthorByIdService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  execute(id: number) {
    return this.authorRepository.findOneByOrFail({ id });
  }
}

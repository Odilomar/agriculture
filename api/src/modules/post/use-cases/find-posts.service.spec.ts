import { Test, TestingModule } from '@nestjs/testing';
import { FindPostsService } from './find-posts.service';

describe('FindPostsService', () => {
  let service: FindPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindPostsService],
    }).compile();

    service = module.get<FindPostsService>(FindPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

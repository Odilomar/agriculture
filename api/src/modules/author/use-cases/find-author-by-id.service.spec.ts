import { Test, TestingModule } from '@nestjs/testing';
import { FindAuthorByIdService } from './find-author-by-id.service';

describe('FindAuthorByIdService', () => {
  let service: FindAuthorByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAuthorByIdService],
    }).compile();

    service = module.get<FindAuthorByIdService>(FindAuthorByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

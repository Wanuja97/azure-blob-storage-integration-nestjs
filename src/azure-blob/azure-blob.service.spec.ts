import { Test, TestingModule } from '@nestjs/testing';
import { AzureBlobService } from './azure-blob.service';

describe('AzureBlobService', () => {
  let service: AzureBlobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureBlobService],
    }).compile();

    service = module.get<AzureBlobService>(AzureBlobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

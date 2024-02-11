import { Test, TestingModule } from '@nestjs/testing';
import { RandomCodeService } from './random-code.service';

describe('RandomCodeService', () => {
  let service: RandomCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomCodeService],
    }).compile();

    service = module.get<RandomCodeService>(RandomCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a random character', () => {
    const randomChar = service.generateRandomChar();
    expect(randomChar).toMatch(/^[a-z]$/);
  });

  it('should generate a row', () => {
    const row = service.generateRow();
    expect(row).toHaveLength(10);
    row.forEach((char) => {
      expect(char).toMatch(/^[a-z]$/);
    });
  });

  it('should generate a matrix', () => {
    const matrix = service.generateMatrix();
    expect(matrix).toHaveLength(10);
    matrix.forEach((row) => {
      expect(row).toHaveLength(10);
      row.forEach((char) => {
        expect(char).toMatch(/^[a-z]$/);
      });
    });
  });

  it('should generate a matrix with weight character filling >= 20% of cells', () => {
    const weightChar = 'z';
    const matrix = service.generateMatrix(weightChar);

    let weightCharCount = 0;
    matrix.forEach((row) => {
      row.forEach((char) => {
        if (char === weightChar) {
          weightCharCount++;
        }
      });
    });

    const totalCells = 10 * 10;
    const expectedWeightCharCount = Math.floor(totalCells * 0.2);
    expect(weightCharCount).toBeGreaterThanOrEqual(expectedWeightCharCount);
  });
});

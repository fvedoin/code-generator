import { Test, TestingModule } from '@nestjs/testing';
import { RandomCodeController } from './random-code.controller';
import { RandomCodeService } from './random-code.service';

describe('RandomCodeController', () => {
  let controller: RandomCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomCodeController],
      providers: [RandomCodeService],
    }).compile();

    controller = module.get<RandomCodeController>(RandomCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate a matrix', () => {
    const matrix = controller.generateMatrix();
    expect(matrix).toHaveLength(10);
    matrix.forEach((row) => {
      expect(row).toHaveLength(10);
    });
  });

  it('should generate a matrix with weight character filling >= 20% of cells', () => {
    const weightChar = 'z';
    const matrix = controller.generateMatrix(weightChar);

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

  it('should throw BadRequestException for invalid character', () => {
    expect(() => controller.generateMatrix('invalid')).toThrowError(
      'Invalid character. Please provide a single alphabetical character.',
    );
  });
});

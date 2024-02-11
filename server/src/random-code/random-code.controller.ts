import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { RandomCodeService } from './random-code.service';

@Controller('random-code')
export class RandomCodeController {
  constructor(private readonly matrixService: RandomCodeService) {}

  @Get()
  generateMatrix(@Query('weightChar') weightChar?: string): string[][] {
    if (weightChar && !/^[a-zA-Z]$/.test(weightChar)) {
      throw new BadRequestException(
        'Invalid character. Please provide a single alphabetical character.',
      );
    }
    return this.matrixService.generateMatrix(weightChar?.toLocaleLowerCase());
  }
}

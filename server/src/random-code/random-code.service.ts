import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomCodeService {
  private matrixDimension: number = 10;

  generateRandomChar(): string {
    const alphabetLength = 26;
    return String.fromCharCode(97 + Math.floor(Math.random() * alphabetLength));
  }

  ensureWeightCharCount(row: string[], weightChar: string): void {
    let weightCharCount = row.filter((char) => char === weightChar).length;

    while (weightCharCount < 2) {
      const randomIndex = Math.floor(Math.random() * this.matrixDimension);
      if (row[randomIndex] !== weightChar) {
        row[randomIndex] = weightChar;
        weightCharCount++;
      }
    }
  }

  generateRow(weightChar?: string): string[] {
    const row: string[] = Array.from({ length: this.matrixDimension }, () =>
      this.generateRandomChar(),
    );

    if (!weightChar) {
      return row;
    }

    this.ensureWeightCharCount(row, weightChar);

    return row;
  }

  generateMatrix(weightChar?: string): string[][] {
    return Array.from({ length: this.matrixDimension }, () =>
      this.generateRow(weightChar),
    );
  }
}

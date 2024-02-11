import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('RandomCodeController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/random-code (GET) without weightChar should return a 10x10 matrix', () => {
    return request(app.getHttpServer())
      .get('/random-code')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(10);
        res.body.forEach((row) => {
          expect(row).toHaveLength(10);
        });
      });
  });

  it('/random-code (GET) with weightChar should return a 10x10 matrix with weightChar filling >= 20% of cells', () => {
    const weightChar = 'z';

    return request(app.getHttpServer())
      .get(`/random-code?weightChar=${weightChar}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(10);
        let weightCharCount = 0;

        res.body.forEach((row) => {
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

  it('/random-code (GET) with invalid weightChar should return a Bad Request error', () => {
    const weightChar = 'invalid';

    return request(app.getHttpServer())
      .get(`/random-code?weightChar=${weightChar}`)
      .expect(400)
      .expect((res) => {
        const { error, message } = res.body;
        expect(message).toBe(
          'Invalid character. Please provide a single alphabetical character.',
        );
        expect(error).toBe('Bad Request');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

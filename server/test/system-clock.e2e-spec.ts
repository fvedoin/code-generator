import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('SystemClockController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/system-clock (GET) should return a date', () => {
    return request(app.getHttpServer())
      .get('/system-clock')
      .expect(200)
      .expect((res) => {
        const isDateValid = !isNaN(new Date(res.text).getTime());
        expect(isDateValid).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

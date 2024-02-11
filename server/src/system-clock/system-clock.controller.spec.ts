// system.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SystemClockController } from './system-clock.controller';

describe('SystemClockController', () => {
  let controller: SystemClockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemClockController],
    }).compile();

    controller = module.get<SystemClockController>(SystemClockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the system clock', () => {
    // Mock Date class to return a specific date
    const mockDate = new Date('2022-01-01T12:34:56.789Z');
    const originalDate = global.Date;
    global.Date = jest.fn(() => mockDate) as any;

    const result = controller.getSystemClock();

    // Restore the original Date class
    global.Date = originalDate;

    expect(result).toBeDefined();
    expect(result).toEqual('2022-01-01T12:34:56.789Z');
  });
});

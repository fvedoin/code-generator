import { Controller, Get } from '@nestjs/common';

@Controller('system-clock')
export class SystemClockController {
  @Get()
  getSystemClock() {
    const systemTime = new Date();
    return systemTime.toISOString();
  }
}

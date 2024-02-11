import { Module } from '@nestjs/common';
import { RandomCodeController } from './random-code/random-code.controller';
import { RandomCodeService } from './random-code/random-code.service';
import { SystemClockController } from './system-clock/system-clock.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RandomCodeController, SystemClockController],
  providers: [RandomCodeService],
})
export class AppModule {}

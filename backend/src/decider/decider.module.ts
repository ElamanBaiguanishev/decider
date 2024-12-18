import { Module } from '@nestjs/common';
import { DeciderService } from './decider.service';
import { DeciderController } from './decider.controller';

@Module({
  controllers: [DeciderController],
  providers: [DeciderService],
})
export class DeciderModule {}

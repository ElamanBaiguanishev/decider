import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decider } from './entities/decider.entity';
import { MapEntity } from 'src/maps/entities/map.entity';
import { DeciderService } from './decider.service';
import { DeciderController } from './decider.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Decider, MapEntity])],
  controllers: [DeciderController],
  providers: [DeciderService],
})
export class DeciderModule { }

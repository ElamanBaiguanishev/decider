import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './entities/map.entity';
import { Decider } from 'src/decider/entities/decider.entity';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity, Decider])],
  controllers: [MapsController],
  providers: [MapsService],
})
export class MapsModule { }

import { Module } from '@nestjs/common';
import { LobbyGateway } from './lobby.gateway';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from './entities/lobby.entity';
import { LobbyMemoryService } from './lobby-memory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  providers: [LobbyGateway, LobbyService, LobbyMemoryService],
  controllers: [LobbyController],
})
export class LobbyModule { }

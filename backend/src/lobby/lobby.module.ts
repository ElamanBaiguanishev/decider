import { Module } from '@nestjs/common';
import { LobbyGateway } from './lobby.gateway';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';

@Module({
  providers: [LobbyGateway, LobbyService],
  controllers: [LobbyController],
})
export class LobbyModule {}

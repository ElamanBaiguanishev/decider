import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';

@Controller('lobby')
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) { }

    @Post()
    create(@Body() createLobbyDto: CreateLobbyDto) {
        return this.lobbyService.create(createLobbyDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lobbyService.findById(+id)
    }

    @Get('by-decider/:id')
    findAllLobbiesByDeciderId(@Param('id') deciderId: string) {
        return this.lobbyService.getLobbiesByDeciderId(+deciderId)
    }
}

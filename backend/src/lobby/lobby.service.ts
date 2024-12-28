import { Injectable } from '@nestjs/common';
import { Lobby } from './entities/lobby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLobbyDto } from './dto/create-lobby.dto';

@Injectable()
export class LobbyService {
    constructor(
        @InjectRepository(Lobby)
        private readonly lobbyRepository: Repository<Lobby>,
    ) { }

    async create(createLobbyDto: CreateLobbyDto) {
        return await this.lobbyRepository.save(createLobbyDto)
    }

    async findById(id: number): Promise<Lobby> {
        return this.lobbyRepository.findOne({
            where: {
                id
            },
            relations: ['creator', 'decider', 'decider.maps']
        })
    }

    async getLobbiesByDeciderId(deciderId: number) {
        return await this.lobbyRepository.find({
            where: {
                decider: { id: deciderId },
            },
            relations: ['creator', 'decider.maps'], // Подгружаем связанные сущности
            order: {
                createdAt: 'DESC', // Сортируем по дате создания (по убыванию)
            },
        });
    }
}

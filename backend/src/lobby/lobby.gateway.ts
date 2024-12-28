import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { Server, Socket } from 'socket.io';

// Типы для сообщений
interface BanMapData {
    lobbyId: string;
    mapId: string;
    userId: string;
}

interface PickRaceData {
    lobbyId: string;
    userId: number;
    race: number; // ID выбранной расы
}

interface UserInfo {
    id: number;
    isReady: boolean;
    races: number[] | null
}

interface GameMap {
    id: number;
    isBanned: boolean;
}

interface Lobby {
    players: UserInfo[];
    observers: number[] | null;
    gameMaps: GameMap[];
    status: string;
    type: number;
    turn: number;
    raceCount: number
}

@WebSocketGateway(3001, { namespace: 'lobby', cors: true })
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('LobbyGateway');
    private lobbies: Map<number, Lobby> = new Map();

    constructor(private readonly lobbyService: LobbyService) { }

    afterInit() {
        this.logger.log('WebSocket сервер запущен');
    }

    async handleConnection(client: Socket) {
        const { lobbyId, userId } = client.handshake.query;

        if (!lobbyId || !userId) {
            this.logger.warn(`Попытка подключения без lobbyId или userId`);
            client.emit('error', 'Необходимы lobbyId и userId');
            client.disconnect();
            return;
        }

        await this.initLobbyInMemory(+lobbyId);

        const lobby = this.lobbies.get(+lobbyId);

        if (!lobby) {
            client.emit('error', 'Лобби не найдено');
            client.disconnect();
            return;
        }

        console.log(lobby.status);

        // Отправляем начальные данные лобби клиенту
        this.server.to(client.id).emit('lobbyData', lobby);

        if (lobby.status === 'Completed') {
            this.logger.warn(`Лобби ${lobbyId} уже завершено`);
            client.emit('error', 'Лобби уже завершено');
            client.disconnect();
            return;
        }

        const isParticipant = lobby.players.some(player => player.id === +userId);

        if (!isParticipant) {
            this.logger.warn(`Пользователь ${userId} не является участником лобби ${lobbyId}`);
            client.emit('error', 'Вы не являетесь участником этого лобби');
            client.join(lobbyId);
            return;
        }

        client.join(lobbyId);
        this.logger.log(`Игрок ${userId} подключился к лобби ${lobbyId}`);

        if (lobby.players.filter(player => player.id).length === 2) {
            this.server.to(lobbyId).emit('lobbyData', lobby);
        } else {
            client.emit('waitingForOpponent', { message: 'Ожидаем второго игрока' });
        }
    }


    async handleDisconnect(client: Socket) {
        const { lobbyId, userId } = client.handshake.query;
        const lobby = this.lobbies.get(+lobbyId);

        if (lobby) {
            if (!lobby) {
                return { event: 'error', data: 'Лобби не найдено' };
            }

            const player = lobby.players.find((player) => player.id === +userId);

            if (!player) {
                return { event: 'error', data: 'Игрок не найден в лобби' };
            }

            player.isReady = false;

            if (!lobby.players.every((player) => player.isReady)) {
                if (lobby.status != 'Completed') {
                    lobby.status = 'Created';
                }
            }

            this.logger.log(`Игрок ${userId} покинул лобби ${lobbyId}`);

            this.server.to(lobbyId).emit('lobbyData', lobby);
        }
    }

    // Начеркали 3 карты, эти 3 карты остались, дать возможность выбор 

    // Инициализация лобби в памяти
    private async initLobbyInMemory(lobbyId: number): Promise<void> {
        if (this.lobbies.has(lobbyId)) {
            this.logger.warn(`Лобби ${lobbyId} уже инициализировано в памяти`);
            return;
        }

        const lobby = await this.lobbyService.findById(lobbyId);
        if (lobby) {
            const gameMaps: GameMap[] = lobby.decider.maps.map((mapEntity) => {
                return {
                    id: mapEntity.id,
                    isBanned: false
                };
            });

            const players: UserInfo[] = [
                { id: lobby.creator.id, isReady: false, races: null },
                { id: lobby.opponent, isReady: false, races: null },
            ];

            this.logger.log(`Инициализируем лобби ${lobbyId} в памяти`);
            this.lobbies.set(lobbyId, {
                players: players,
                gameMaps,
                status: lobby.status,
                observers: null,
                type: 0,
                turn: 0,
                raceCount: 1
            });
        } else {
            this.logger.warn(`Лобби с ID ${lobbyId} не найдено`);
        }
    }

    private isLobbyReady(lobbyId: number): boolean {
        const lobby = this.lobbies.get(lobbyId);
        if (!lobby) {
            return false;
        }
        // Проверяем, что все игроки готовы
        return lobby.players.every(player => player.isReady);
    }

    @SubscribeMessage('selectRaces')
    handleSelectRaces(@MessageBody() data: { lobbyId: string; userId: number; races: number[] }) {
        const lobby = this.lobbies.get(+data.lobbyId);

        if (!lobby) {
            return { event: 'error', data: 'Лобби не найдено' };
        }

        const player = lobby.players.find((player) => player.id === data.userId);

        if (!player) {
            return { event: 'error', data: 'Игрок не найден в лобби' };
        }

        player.races = data.races;
        this.logger.log(`Игрок ${data.userId} выбрал расы: ${data.races}`);

        if (lobby.players.every((player) => player.races && player.races.length === lobby.raceCount)) {
            lobby.status = 'InProgress';
        }

        this.server.to(data.lobbyId).emit('lobbyData', lobby);
    }


    // Обработка бана карты
    @SubscribeMessage('banMap')
    async handleBanCard(@MessageBody() data: BanMapData) {
        const lobby = this.lobbies.get(+data.lobbyId);

        if (!lobby) {
            return { event: 'error', data: 'Лобби не найдено' };
        }

        if (lobby.status == 'Completed') {
            return { event: 'error', data: 'Лобби уже завершено' };
        }

        if (!this.isLobbyReady(+data.lobbyId)) {
            return { event: 'error', data: 'Не все игроки готовы' };
        }

        const mapId = +data.mapId;

        // Проверяем, что действие выполняется текущим игроком
        if (lobby.players[lobby.turn].id !== +data.userId) {
            return { event: 'error', data: 'Не ваш ход' };
        }

        // Находим карту и отмечаем её как забаненную
        const targetMap = lobby.gameMaps.find(map => map.id === mapId);

        if (!targetMap) {
            return { event: 'error', data: 'Карта не найдена' };
        }

        if (targetMap.isBanned) {
            return { event: 'error', data: 'Эта карта уже забанена' };
        }

        targetMap.isBanned = true;

        this.logger.log(`Карта ${mapId} успешно забанена игроком ${data.userId}`);

        const activeMaps = lobby.gameMaps.filter(map => !map.isBanned);

        lobby.turn = (lobby.turn + 1) % 2;

        this.logger.log(`Ход передан игроку ${lobby.players[lobby.turn].id}`);

        this.server.to(data.lobbyId).emit('lobbyData', lobby);

        if (activeMaps.length === 1) {
            lobby.status = 'Completed'
            this.server.to(data.lobbyId).emit('gameCompleted', { remainingMap: activeMaps[0] });
            this.server.to(data.lobbyId).emit('lobbyData', lobby);
            return;
        }
    }

    @SubscribeMessage('setReady')
    handleSetReady(@MessageBody() data: { lobbyId: string; userId: number }) {
        const lobby = this.lobbies.get(+data.lobbyId);

        if (!lobby) {
            return { event: 'error', data: 'Лобби не найдено' };
        }

        const player = lobby.players.find((player) => player.id === data.userId);

        if (!player) {
            return { event: 'error', data: 'Игрок не найден в лобби' };
        }

        player.isReady = true;

        if (lobby.players.every(player => player.isReady)) {
            if (lobby.type === 0) {
                lobby.status = lobby.players.every(player => player.races?.length === lobby.raceCount)
                    ? 'InProgress'
                    : 'PickRaces';
            } else {
                lobby.status = 'InProgress';
            }
        }


        this.server.to(data.lobbyId).emit('lobbyData', lobby);
    }
}

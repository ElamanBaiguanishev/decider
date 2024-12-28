import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { LobbyStatus } from '../entities/lobby.entity';
import { Decider } from 'src/decider/entities/decider.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateLobbyDto {
    @IsEnum(LobbyStatus)
    @IsOptional() // Если статус не будет передан, будет использовано значение по умолчанию из сущности
    status?: LobbyStatus;

    @IsInt()
    decider: Decider; // ID связанного Decider

    @IsInt()
    creator: User; // ID пользователя, создающего лобби

    @IsInt()
    @IsOptional() // Оппонент необязателен при создании
    opponent?: number;
}

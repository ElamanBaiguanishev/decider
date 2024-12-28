import { IDecider } from "../decider/decider";
import { IUser } from "../user/user";

export interface ILobby {
    id: number;

    decider: IDecider

    creator: IUser

    opponent: number

    status: LobbyStatus;
}

export enum LobbyStatus {
    Created = 'Создана',
    InProgress = 'В Процессе',
    Completed = 'Завершена',
}

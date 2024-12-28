import api from ".";
import { ILobby } from "../types/lobby/lobby";
import { BaseService } from "./BaseService";

class LobbyService extends BaseService<ILobby> {
    constructor() {
        super('lobby');
    }

    async getLobbiesByDeciderId(deciderId: number): Promise<ILobby[]> {
        try {
            const response = await api.get<ILobby[]>(`${this.baseUrl}/by-decider/${deciderId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching lobbies for decider ID ${deciderId}:`, error);
            throw error;
        }
    }
}

export const lobbyService = new LobbyService();

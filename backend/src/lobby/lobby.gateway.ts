import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*', // Позволить подключение с любого клиента
    },
})
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private users: Map<string, string> = new Map(); // Список пользователей в лобби

    handleConnection(client: Socket) {
        console.log(`User connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`User disconnected: ${client.id}`);
        this.users.delete(client.id); // Удаляем пользователя из списка
    }

    @SubscribeMessage('joinLobby')
    handleJoinLobby(client: Socket, payload: { username: string; room: string }) {
        const { username, room } = payload;

        client.join(room); // Подключаем пользователя к комнате
        this.users.set(client.id, username);

        // Уведомляем всех в комнате
        this.server.to(room).emit('userJoined', { username, room });
        console.log(`${username} joined room ${room}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { room: string; message: string }) {
        const { room, message } = payload;

        // Отправляем сообщение всем пользователям в комнате
        this.server.to(room).emit('message', {
            username: this.users.get(client.id),
            message,
        });
    }
}

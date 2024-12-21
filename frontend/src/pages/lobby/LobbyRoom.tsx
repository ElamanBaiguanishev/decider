import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Container, Button, TextField, Typography, List, ListItem } from "@mui/material";

const LobbyRoom = () => {
  const { id } = useParams(); // ID комнаты из маршрута
  const [socket, setSocket] = useState<Socket | null>(null); // Локальный WebSocket
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!connected) return;

    // Инициализация WebSocket при подключении
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // Слушаем сообщения от сервера
    newSocket.on("message", (data) => {
      setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
    });

    return () => {
      // Отключаемся при размонтировании компонента
      newSocket.disconnect();
      setSocket(null);
    };
  }, [connected]); // Выполняется только при изменении `connected`

  const joinRoom = () => {      setConnected(true);

    if (socket) {
      socket.emit("joinLobby", { username, room: id });
    //   setConnected(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("message", { room: id, message });
      setMessage("");
    }
  };

  return (
    <Container>
      {!connected ? (
        <>
          <Typography variant="h4" gutterBottom>
            Подключение к лобби: {id}
          </Typography>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={joinRoom} // Устанавливаем `connected`, чтобы выполнить подключение
            sx={{ marginTop: 2 }}
          >
            Подключиться
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Лобби: {id}
          </Typography>
          <List>
            {messages.map((msg, idx) => (
              <ListItem key={idx}>{msg}</ListItem>
            ))}
          </List>
          <TextField
            label="Сообщение"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ marginTop: 2 }}
          >
            Отправить
          </Button>
        </>
      )}
    </Container>
  );
};

export default LobbyRoom;

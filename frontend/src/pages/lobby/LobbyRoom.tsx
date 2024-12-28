import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography, List, ListItem, ListItemText, CircularProgress, Box, Avatar } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../../store/hooks";


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

const races = [
  { id: 1, name: "Chaos" },
  { id: 2, name: "Tau" },
  { id: 3, name: "Eldar" },
  { id: 4, name: "Space Marine" },
  { id: 5, name: "Necron" },
];

const LobbyRoom: FC = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);

  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Загрузка данных
  const [error, setError] = useState<string>('')
  const [selectedRaces, setSelectedRaces] = useState<number[]>([]); // Выбранные расы


  useEffect(() => {
    if (!id || !user) return;

    // Устанавливаем соединение с сокетом
    const socketConnection = io("http://localhost:3001/lobby", {
      query: { lobbyId: id, userId: user?.id },
    });

    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("Соединение установлено");
    });

    socketConnection.on("error", (msg: string) => {
      setError(msg)
    });
    // Получение данных лобби
    socketConnection.on("lobbyData", (data: Lobby) => {
      console.log("Получены данные лобби", data);
      setLobby(data);
      setLoading(false);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [id, user]);

  const handleBanMap = (mapId: number) => {
    if (!socket || !lobby) return;
    socket.emit("banMap", { lobbyId: id, mapId, userId: user?.id });
  };

  const handleRaceSelection = (index: number, raceId: number) => {
    const updatedRaces = [...selectedRaces];
    updatedRaces[index] = raceId;
    setSelectedRaces(updatedRaces);
  };

  const handleSubmitRaces = () => {
    if (!socket || !lobby) return;

    socket.emit("selectRaces", { lobbyId: id, userId: user?.id, races: selectedRaces });
    console.log("Выбранные расы отправлены:", selectedRaces);
  };


  const handleReady = () => {
    if (!socket || !lobby) return;
    socket.emit("setReady", { lobbyId: id, userId: user?.id });
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Загрузка лобби...</Typography>
      </Container>
    );
  }

  if (!lobby) {
    return <Typography variant="h4">Лобби не найдено</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Лобби {lobby.status}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Карты
      </Typography>

      {lobby.status === "Created" && (
        <Typography variant="h6" color="textSecondary">
          Ожидаем второго игрока...
        </Typography>
      )}

      {lobby.status === "PickRaces" && (
        <Box>
          <Typography variant="h6">Выберите свои расы:</Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            {Array.from({ length: lobby.raceCount }).map((_, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={`${100 / lobby.raceCount}%`}
              >
                <Typography variant="h6" gutterBottom>Столбец {index + 1}</Typography>
                {races.map((race) => (
                  <Box
                    key={race.id}
                    onClick={() => handleRaceSelection(index, race.id)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: 2,
                      backgroundColor: selectedRaces[index] === race.id ? '#bbdefb' : 'transparent',
                      padding: 1,
                      borderRadius: 1,
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar alt={race.name} src={`path_to_race_icons/${race.name.toLowerCase()}.png`} />
                    <Typography variant="body2">{race.name}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitRaces}
            disabled={selectedRaces.length !== lobby.raceCount}
          >
            Отправить выбор
          </Button>
        </Box>
      )}


      {lobby.status === "InProgress" && (
        <Box>
          <Typography variant="h6">
            Ход {lobby.players[lobby.turn].id}
          </Typography>

          <List>
            {lobby.gameMaps.map((map) => (
              <ListItem key={map.id} divider>
                <ListItemText
                  primary={map.id}
                  secondary={map.isBanned ? "Забанена" : "Доступна"}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBanMap(map.id)}
                  disabled={map.isBanned}
                >
                  Забанить
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {lobby.status === "Completed" && (
        <Typography variant="h6" color="success.main">
          Игра завершена!
        </Typography>
      )}

      <Typography variant="h6" color="error">
        {error}
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={handleReady}
        disabled={lobby.players.find((player) => player.id === user?.id)?.isReady}
      >
        {lobby.players.find((player) => player.id === user?.id)?.isReady
          ? "Готов"
          : "Нажать готовность"}
      </Button>
    </Container>
  );
};

export default LobbyRoom;

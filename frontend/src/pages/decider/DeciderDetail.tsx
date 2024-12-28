import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { deciderService } from "../../api/DeciderService";
import { userService } from "../../api/UserService";
import { lobbyService } from "../../api/LobbyService";
import { useAppSelector } from "../../store/hooks";
import { IDecider } from "../../types/decider/decider";
import { ILobby, LobbyStatus } from "../../types/lobby/lobby";
import { IUser } from "../../types/user/user";

const DeciderDetail: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [decider, setDecider] = useState<IDecider | null>(null);
    const [lobbies, setLobbies] = useState<ILobby[]>([]); // Список лобби
    const [users, setUsers] = useState<IUser[]>([]);
    const [opponentId, setOpponentId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const currentUser = useAppSelector((state) => state.user.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const [deciderData, usersData, lobbiesData] = await Promise.all([
                    deciderService.getById(Number(id)),
                    userService.getAll(),
                    lobbyService.getLobbiesByDeciderId(Number(id)), // Получение лобби для текущего десайдера
                ]);
                setDecider(deciderData);
                setUsers(usersData.filter(user => user.id !== currentUser?.id));
                setLobbies(lobbiesData);
            } catch (err) {
                setError("Ошибка загрузки данных");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, currentUser?.id]);

    const handleCreateLobby = async () => {
        if (!currentUser || !decider || !opponentId) {
            alert("Выберите оппонента");
            return;
        }

        try {
            const newLobby = await lobbyService.create({
                decider: decider,
                creator: currentUser,
                opponent: opponentId,
                status: LobbyStatus.Created,
            });
            alert("Лобби успешно создано!");
            navigate(`/lobby/${newLobby.id}`);
        } catch (err) {
            console.error("Ошибка при создании лобби", err);
            alert("Не удалось создать лобби");
        }
    };

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Загрузка...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h4" color="error" gutterBottom>
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!decider) {
        return (
            <Container>
                <Typography variant="h4" color="error" gutterBottom>
                    Десайдер не найден
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {decider.title}
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        {decider.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        Создатель: {decider.creator.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        Количество карт: {decider.maps.length}
                    </Typography>
                </CardContent>
            </Card>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="opponent-select-label">Выберите оппонента</InputLabel>
                <Select
                    labelId="opponent-select-label"
                    value={opponentId || ""}
                    onChange={(e) => setOpponentId(Number(e.target.value))}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateLobby}
                sx={{ marginTop: 2 }}
                disabled={!opponentId}
            >
                Создать лобби
            </Button>

            <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
                Существующие лобби
            </Typography>
            <List>
                {lobbies.map((lobby) => (
                    <ListItem key={lobby.id} divider>
                        <ListItemText
                            primary={`Лобби ID: ${lobby.id}`}
                            secondary={`Статус: ${lobby.status} | Создатель: ${lobby.creator.name}`}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/lobby/${lobby.id}`)}
                        >
                            Перейти
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default DeciderDetail;

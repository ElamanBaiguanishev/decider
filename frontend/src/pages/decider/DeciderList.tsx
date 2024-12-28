import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deciderService } from "../../api/DeciderService";
import { IDecider } from "../../types/decider/decider";

const DeciderList: FC = () => {
    const [deciders, setDeciders] = useState<IDecider[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Загрузка списка десайдеров при монтировании компонента
    useEffect(() => {
        const fetchDeciders = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await deciderService.getAll();
                setDeciders(data);
            } catch (err) {
                setError("Ошибка загрузки десайдеров");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDeciders();
    }, []);

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

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Список всех десайдеров
            </Typography>
            <List>
                {deciders.map((decider) => (
                    <ListItem key={decider.id} component={Link} to={`/deciders/${decider.id}`}>
                        <ListItemText
                            primary={decider.title}
                            secondary={decider.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default DeciderList;

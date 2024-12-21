import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Card, CardContent } from "@mui/material";
import { deciderService } from "../../api/DeciderService";
import { IDecider } from "../../types/decider/Decider";

const DeciderDetail: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [decider, setDecider] = useState<IDecider | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDecider = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const data = await deciderService.getById(Number(id));
                setDecider(data);
            } catch (err) {
                setError("Ошибка загрузки данных десайедера");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDecider();
    }, [id]);

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
                        Создатель: {decider.creator.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        Количество карт: {decider.maps.length}
                    </Typography>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/lobby/create')}
                sx={{ marginTop: 2 }}
            >
                Создать лобби
            </Button>
        </Container>
    );
};

export default DeciderDetail;

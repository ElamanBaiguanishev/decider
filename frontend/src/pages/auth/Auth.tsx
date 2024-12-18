import { FC } from "react";
import { Container, Typography, Box } from "@mui/material";


const Auth: FC = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Форма входа
                </Typography>
            </Box>
        </Container>
    );
};

export default Auth;

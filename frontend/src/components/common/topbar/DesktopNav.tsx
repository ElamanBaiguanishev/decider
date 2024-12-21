import { Box, Button } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const DesktopNav: FC = () => {
    return (
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
                Главная
            </Button>
            <Button color="inherit" component={Link} to="/decider">
                Десайдер
            </Button>
            <Button color="inherit" component={Link} to="/lobbies">
                Лобби
            </Button>
            <Button color="inherit" component={Link} to="/maps">
                Карты
            </Button>
            <Button color="inherit" component={Link} to="/contact">
                Контакты
            </Button>
        </Box>
    )
}

export default DesktopNav;

import { Box, Button } from "@mui/material";
import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Decider: FC = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    padding: 2,
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                }}
            >
                <Button
                    component={NavLink}
                    to="/decider/create"
                    sx={{
                        "&.active": {
                            color: "#1976d2",
                            fontWeight: "bold",
                        },
                    }}
                >
                    Создать Десайдер
                </Button>
                <Button
                    component={NavLink}
                    to="/decider/list"
                    sx={{
                        "&.active": {
                            color: "#1976d2",
                            fontWeight: "bold",
                        },
                    }}
                >
                    Список Десайдеров
                </Button>
            </Box>

            <Box sx={{ padding: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Decider;

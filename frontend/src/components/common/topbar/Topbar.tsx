import { AppBar, Toolbar, Typography, IconButton, Drawer, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { FC, useState } from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import './header.css';
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { clearUser } from "../../../store/user/userSlice";

const Topbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {user ? (
            <>
              <Typography variant="body1" component="span">
                {user.name} {user.id}
              </Typography>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Typography variant="body1" component="span">
              Гость
            </Typography>
          )}
        </div>

        <DesktopNav />

        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <MobileNav handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </AppBar>
  );
};

export default Topbar;

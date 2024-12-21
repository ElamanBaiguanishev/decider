import { AppBar, Toolbar, Typography, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useState } from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import './header.css'

const Topbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

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

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <MobileNav handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </AppBar>
  );
};

export default Topbar;

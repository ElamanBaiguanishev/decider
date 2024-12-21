import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { FC } from "react";

interface MobileNavProps {
  handleDrawerToggle: () => void;
}

const MobileNav: FC<MobileNavProps> = ({ handleDrawerToggle }) => {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/decider">
            <ListItemText primary="Десайдер" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/lobbies">
            <ListItemText primary="Лобби" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/maps">
            <ListItemText primary="Карты" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact">
            <ListItemText primary="Контакты" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MobileNav;

import { AppBar, Toolbar } from "@mui/material";
import { FC, useEffect } from "react";

const Topbar: FC = () => {
  useEffect(() => {

  }, []);

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar>

      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

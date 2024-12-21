import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Topbar from "../common/topbar/Topbar";
// import Footer from "../common/Footer"; // Предполагается, что Footer уже создан
import { FC } from "react";

const MainLayout: FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Topbar />

      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}
      >
        <Outlet />
      </Box>

      {/* <Footer sx={{ mt: "auto", p: 2 }} /> */}
    </Box>
  );
};

export default MainLayout;

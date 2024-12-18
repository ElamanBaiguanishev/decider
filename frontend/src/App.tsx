import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppSelector } from "./store/hooks";
import { themeChoice } from "./newtheme";

function App() {
  const mode = useAppSelector((state) => state.theme.mode)

  return (
    <ThemeProvider theme={createTheme(themeChoice(mode))}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App

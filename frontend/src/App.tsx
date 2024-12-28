import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { router } from "./router/router";
import { themeChoice } from "./newtheme";
import { useEffect } from "react";
import { userService } from "./api/UserService";
import { changeId } from "./store/user/userSlice";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const id = prompt("Введите ID пользователя:");
        if (!id) return;

        try {
          const user = await userService.getById(Number(id));
          dispatch(changeId(user));
          alert(`Пользователь загружен: ${user.name}`);
        } catch (error) {
          alert("Не удалось загрузить пользователя. Проверьте ID.");
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={createTheme(themeChoice(mode))}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/user/user';
import { localStorageService } from '../../localstorage/local-storage.service';

interface UserState {
    user: IUser | null;
}

// Указываем ключ для хранения данных пользователя в localStorage
const USER_STORAGE_KEY = 'user';

// Получение начального состояния из localStorage
const initialState: UserState = {
    user: localStorageService.getItem(USER_STORAGE_KEY) as IUser | null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeId: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            // Сохраняем пользователя в localStorage при изменении
            localStorageService.setItem(USER_STORAGE_KEY, action.payload);
        },
        clearUser: (state) => {
            state.user = null;
            // Удаляем пользователя из localStorage
            localStorageService.removeItem(USER_STORAGE_KEY);
        },
    },
});

// Экспортируем действия
export const { changeId, clearUser } = userSlice.actions;

// Селектор для получения пользователя из состояния
export const selectUser = (state: RootState): IUser | null => state.user.user;

// Экспортируем редуктор
export default userSlice.reducer;

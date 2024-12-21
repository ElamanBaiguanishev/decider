import api from ".";

export abstract class BaseService<T> {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Получить все сущности
    async getAll(): Promise<T[]> {
        try {
            const response = await api.get<T[]>(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Получить сущность по ID
    async getById(id: number): Promise<T> {
        try {
            const response = await api.get<T>(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data by ID:', error);
            throw error;
        }
    }

    // Создание сущности (получаем Omit для исключения id, если оно генерируется сервером)
    async create(entity: Omit<T, 'id'>): Promise<T> {
        try {
            const response = await api.post<T>(this.baseUrl, entity);
            return response.data;
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }

    // Обновление сущности (используем Partial для возможности обновления части данных)
    async update(id: number, entity: Partial<T>): Promise<T> {
        try {
            const response = await api.put<T>(`${this.baseUrl}/${id}`, entity);
            return response.data;
        } catch (error) {
            console.error('Error updating entity:', error);
            throw error;
        }
    }

    // Удаление сущности
    async delete(id: number): Promise<void> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
        } catch (error) {
            console.error('Error deleting entity:', error);
            throw error;
        }
    }
}

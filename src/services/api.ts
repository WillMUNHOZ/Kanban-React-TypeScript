import { Task } from "../model/Task";

export const tasksService = {
    async fetchTasks(): Promise<Task[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const data: Task[] = await response.json()
        return data
    },

    async createTask(attributes: Omit<Task, "id">): Promise<Task> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Context-Type": "application/json"
            },
            body: JSON.stringify(attributes)
        });
        const newTask: Task = await response.json();
        return newTask
    },

    async updateTask(id: number, attributes: Partial<Omit<Task, "id">>): Promise<Task> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Context-Type": "application/json"
            },
            body: JSON.stringify(attributes)
        });
        const updateTask: Task = await response.json();
        return updateTask;
    },

    async deleteTask(id: number): Promise<void> {
        await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { method: "DELETE" })
    }
}
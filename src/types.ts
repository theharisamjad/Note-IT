export interface Todo {
    id: number | null;
    title: string;
    description: string;
    dateString?: string;
    completed?: boolean;
}

export interface TodoStore {
    todos: Todo[];
    loadTodos: () => Promise<void>;
    addTodo: (todo: Todo) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}
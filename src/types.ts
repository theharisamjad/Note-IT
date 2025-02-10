export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoStore {
    todos: Todo[];
    loadTodos: () => Promise<void>;
    addTodo: (text: string) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}
import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoStore } from './types';

const store: StateCreator<TodoStore> = (set, get) => ({
  todos: [],
  loadTodos: async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        set({ todos: JSON.parse(storedTodos) as Todo[] });
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  },
  addTodo: async (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    const updatedTodos = [...get().todos, newTodo];
    set({ todos: updatedTodos });
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  toggleTodo: async (id: number) => {
    const updatedTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updatedTodos });
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  deleteTodo: async (id: number) => {
    const updatedTodos = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updatedTodos });
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
});

export const useStore = create<TodoStore>(store);
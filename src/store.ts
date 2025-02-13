import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoStore } from './types';

const store: StateCreator<TodoStore> = (set, get) => ({
  todos: [],
  selectedTodo: null,

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
  addTodo: async (Todoitem: Todo) => {
    const {id, title, description , dateString  } = Todoitem
    const newTodo: Todo = { id, title ,  description, dateString, completed: false };
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
  editTodo: async (Todoitem: Todo) => {
    const {id, title, description , dateString  } = Todoitem
    const updatedTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, title: title, description: description } : todo
    );
    set({ todos: updatedTodos });
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  deleteTodo: async (id: number) => {
    const updatedTodos = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updatedTodos });
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
   // Set the selected todo
   setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
});

export const useStore = create<TodoStore>(store);
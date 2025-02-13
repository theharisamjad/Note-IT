import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoStore } from './types';

const store: StateCreator<TodoStore> = (set, get) => ({
  todos: [],
  originalTodos: [],
  selectedTodo: null,

  loadTodos: async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        const todos = JSON.parse(storedTodos) as Todo[];
        set({ todos, originalTodos: todos }); // Initialize originalTodos
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  },
  addTodo: async (Todoitem: Todo) => {
    const {id, title, description , dateString  } = Todoitem
    const newTodo: Todo = { id, title ,  description, dateString, completed: false };
    const updatedTodos = [...get().todos, newTodo];
    set({ todos: updatedTodos, originalTodos: updatedTodos }); // Update both lists
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  toggleTodo: async (id: number) => {
    const updatedTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updatedTodos, originalTodos: updatedTodos }); // Update both lists
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  editTodo: async (Todoitem: Todo) => {
    const {id, title, description  } = Todoitem
    const updatedTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, title: title, description: description } : todo
    );
    set({ todos: updatedTodos, originalTodos: updatedTodos }); // Update both lists
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  deleteTodo: async (id: number) => {
    const updatedTodos = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updatedTodos, originalTodos: updatedTodos }); // Update both lists
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  clearAllTodos: async () => {
    await AsyncStorage.removeItem('todos', () => console.log('todos cleared'))
  },
   // Set the selected todo
   setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
   filterTodos : (filterBy: string) => {
    const { originalTodos } = get(); // Get the original list of todos

    if(filterBy === 'Completed'){
      const updatedTodos = get().todos.filter((todo) => todo.completed);
      set({ todos: updatedTodos });
    }
    else{
      set({ todos: originalTodos }); // Reset to the original list
    }
   }
});

export const useStore = create<TodoStore>(store);
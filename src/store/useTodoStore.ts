import { create } from "zustand";
import type { TodoItem } from "../types/todo";

interface TodoStore {
  list: TodoItem[],
  addTodo: (title: string) => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoStore>()((set) => ({
  list: [],
  addTodo: (title) => {
    const value = title.trim()
    if (!value) return
    set((state) => ({
      list: [
        ...state.list,
        { id: Date.now(), title: value },
      ]
    }))
  },
  removeTodo: (id) =>
    set((state) => ({
      list: state.list.filter((item) => item.id !== id)
    }))
}))
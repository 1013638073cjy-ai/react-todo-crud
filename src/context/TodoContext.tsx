import { createContext, useContext, useState, type ReactNode } from "react";
import type { TodoItem } from "../types/todo";

interface TodoContextValue {
  list: TodoItem[]
  addTodo: (title: string) => void
  removeTodo: (id: number) => void
}

const TodoContext = createContext<TodoContextValue | null>(null)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<TodoItem[]>([])
  const addTodo = (title: string) => {
    const value = title.trim()
    if (!value) return

    const newTodo: TodoItem = {
      id: Date.now(),
      title: value
    }
    setList((item) => [...item, newTodo])
  }
  // 2.删除
  const removeTodo = (id: number) => {
    setList((prev) => prev.filter((item) => id !== item.id))
  }
  return (
    <TodoContext.Provider value={{ list, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  )

}
export function useTodoContext() {
  const context = useContext(TodoContext)
  if (context === null) {
    throw new Error("seTodoContext 必须在 TodoProvider 内使用")
  }
  return context
}
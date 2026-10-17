import { useState } from "react";
import type { TodoItem } from "../types/todo";

export function useTodoList() {
  const [list, setList] = useState<TodoItem[]>([])
  // 1.新增
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
  return { list, addTodo, removeTodo }
}
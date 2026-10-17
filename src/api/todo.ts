import request from "./request"

import type {
  TodoItem,
  CreateTodoInput,
  UpdateTodoInput
} from "../types/todo"

export async function getTodos(): Promise<TodoItem[]> {
  const response = await request.get<TodoItem[]>("/todos")
  return response.data
}

export async function createTodo(data: CreateTodoInput): Promise<TodoItem> {
  const response = await request.post<TodoItem>("/todos", data)
  return response.data
}

export async function updateTodo(id: number, data: UpdateTodoInput): Promise<TodoItem> {
  const response = await request.patch<TodoItem>(`/todos/${id}`, data)
  return response.data
}

export async function deleteTodo(id: number): Promise<void> {
  await request.delete(`/todos/${id}`)

}

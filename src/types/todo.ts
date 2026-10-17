export interface TodoItem {
  id: number,
  title: string,
  completed?: boolean
}
export interface CreateTodoInput {
  title: string,
  completed: boolean
}
export interface UpdateTodoInput {
  title?: string,
  completed?: boolean
}
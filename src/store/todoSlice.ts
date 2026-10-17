import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem } from "../types/todo";

interface TodoState {
  list: TodoItem[]
}
const initialState: TodoState = {
  list: [],
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.list.push(action.payload)
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload)
    }
  }
})
export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer
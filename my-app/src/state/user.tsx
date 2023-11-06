import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  id: string;
  email: string;
  username: string;
  token: string;
  todoList: any[];
  todo: any;
}

const initialState: CounterState = {
  id: "",
  email: "",
  username: "",
  token: "",
  todoList: [],
  todo: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
    setTodos: (state, action) => {
      state.todoList = action.payload.todos;
    },
    updateTodos: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
});

export const {
  setCredentials,
  updateToken,
  setTodos,
  updateTodos,
  setTodo,
  deleteTodo,
} = userSlice.actions;
export default userSlice.reducer;

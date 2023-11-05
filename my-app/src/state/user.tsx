import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  id: string;
  email: string;
  username: string;
  token: string;
  todoList: [];
}

const initialState: CounterState = {
  id: "",
  email: "",
  username: "",
  token: "",
  todoList: [],
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
  },
});

export const { setCredentials, updateToken, setTodos } = userSlice.actions;
export default userSlice.reducer;

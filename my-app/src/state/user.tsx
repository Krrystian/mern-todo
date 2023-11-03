import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  email: string;
  username: string;
  token: string;
}

const initialState: CounterState = {
  email: "",
  username: "",
  token: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials, updateToken } = userSlice.actions;
export default userSlice.reducer;

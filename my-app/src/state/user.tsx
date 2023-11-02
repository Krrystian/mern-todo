import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  email: string;
  username: string;
}

const initialState: CounterState = {
  email: "",
  username: "",
};

export const userSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loading: {
    isLoading: boolean;
  };
  newTodo: {
    isOpen: boolean;
  };
}

const initialState: CounterState = {
  loading: {
    isLoading: false,
  },
  newTodo: {
    isOpen: false,
  },
};

export const modelSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    loadingOpen: (state) => {
      state.loading.isLoading = true;
    },
    loadingClose: (state) => {
      state.loading.isLoading = false;
    },
    newTodoOpen: (state) => {
      state.newTodo.isOpen = true;
    },
    newTodoClose: (state) => {
      state.newTodo.isOpen = false;
    },
  },
});

export const { loadingOpen, loadingClose, newTodoClose, newTodoOpen } =
  modelSlice.actions;
export default modelSlice.reducer;

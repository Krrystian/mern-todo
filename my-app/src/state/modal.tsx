import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loading: {
    isLoading: boolean;
  };
}

const initialState: CounterState = {
  loading: {
    isLoading: false,
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
  },
});

export const { loadingOpen, loadingClose } = modelSlice.actions;
export default modelSlice.reducer;

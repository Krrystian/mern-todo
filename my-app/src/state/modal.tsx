import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loading: {
    isLoading: boolean;
  };
  newTodo: {
    isOpen: boolean;
  };
  joinNewTodo: {
    isOpen: boolean;
  };
  sharing: {
    isOpen: boolean;
  };
  title: {
    isOpen: boolean;
  };
  password: {
    isOpen: boolean;
  };
  newTask: {
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
  joinNewTodo: {
    isOpen: false,
  },
  sharing: {
    isOpen: false,
  },
  title: {
    isOpen: false,
  },
  password: {
    isOpen: false,
  },
  newTask: {
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
    newTodoJoinOpen: (state) => {
      state.joinNewTodo.isOpen = true;
    },
    newTodoJoinClose: (state) => {
      state.joinNewTodo.isOpen = false;
    },
    sharingOpen: (state) => {
      state.sharing.isOpen = true;
    },
    sharingClose: (state) => {
      state.sharing.isOpen = false;
    },
    titleOpen: (state) => {
      state.title.isOpen = true;
    },
    titleClose: (state) => {
      state.title.isOpen = false;
    },
    passwordOpen: (state) => {
      state.password.isOpen = true;
    },
    passwordClose: (state) => {
      state.password.isOpen = false;
    },
    newTaskOpen: (state) => {
      state.newTask.isOpen = true;
    },
    newTaskClose: (state) => {
      state.newTask.isOpen = false;
    },
  },
});

export const {
  loadingOpen,
  loadingClose,
  newTodoClose,
  newTodoOpen,
  newTodoJoinOpen,
  newTodoJoinClose,
  sharingOpen,
  sharingClose,
  titleOpen,
  titleClose,
  passwordOpen,
  passwordClose,
  newTaskOpen,
  newTaskClose,
} = modelSlice.actions;
export default modelSlice.reducer;

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
  menuBar: {
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
  menuBar: {
    isOpen: false,
  },
};

export const modelSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    loadingOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.loading.isLoading = true;
    },
    loadingClose: (state) => {
      document.body.style.overflow = "unset";
      state.loading.isLoading = false;
    },
    newTodoOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.newTodo.isOpen = true;
    },
    newTodoClose: (state) => {
      document.body.style.overflow = "unset";
      state.newTodo.isOpen = false;
    },
    newTodoJoinOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.joinNewTodo.isOpen = true;
    },
    newTodoJoinClose: (state) => {
      document.body.style.overflow = "unset";
      state.joinNewTodo.isOpen = false;
    },
    sharingOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.sharing.isOpen = true;
    },
    sharingClose: (state) => {
      document.body.style.overflow = "unset";
      state.sharing.isOpen = false;
    },
    titleOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.title.isOpen = true;
    },
    titleClose: (state) => {
      document.body.style.overflow = "unset";
      state.title.isOpen = false;
    },
    passwordOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.password.isOpen = true;
    },
    passwordClose: (state) => {
      document.body.style.overflow = "unset";
      state.password.isOpen = false;
    },
    newTaskOpen: (state) => {
      state.newTask.isOpen = true;
      document.body.style.overflow = "hidden";
    },
    newTaskClose: (state) => {
      state.newTask.isOpen = false;
      document.body.style.overflow = "unset";
    },
    menuOpen: (state) => {
      state.menuBar.isOpen = true;
      document.body.style.overflow = "unset";
    },
    menuClose: (state) => {
      state.menuBar.isOpen = false;
      document.body.style.overflow = "hidden";
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
  menuOpen,
  menuClose,
} = modelSlice.actions;
export default modelSlice.reducer;

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
  edit: {
    isOpen: boolean;
    id: string;
    title: string;
    description: string;
  };
  delete: {
    isOpen: boolean;
    id: string;
    task: boolean;
    progressStage: string;
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
  edit: {
    isOpen: false,
    title: "",
    description: "",
    id: "",
  },
  delete: {
    isOpen: false,
    id: "",
    task: false,
    progressStage: "",
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
      if (state.menuBar.isOpen) document.body.style.overflow = "unset";
      state.newTodo.isOpen = false;
    },
    newTodoJoinOpen: (state) => {
      document.body.style.overflow = "hidden";
      state.joinNewTodo.isOpen = true;
    },
    newTodoJoinClose: (state) => {
      if (state.menuBar.isOpen) document.body.style.overflow = "unset";
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
    editOpen: (state, action) => {
      state.edit.isOpen = true;
      state.edit.id = action.payload.id;
      state.edit.description = action.payload.description;
      state.edit.title = action.payload.title;
      document.body.style.overflow = "hidden";
    },
    editClose: (state) => {
      state.edit.isOpen = false;
      document.body.style.overflow = "unset";
    },
    deleteOpen: (state, action) => {
      state.delete.isOpen = true;
      state.delete.id = action.payload.id;
      state.delete.task = action.payload.task;
      state.delete.progressStage = action.payload.progressStage;
      document.body.style.overflow = "hidden";
    },
    deleteClose: (state) => {
      state.delete.isOpen = false;
      if (state.menuBar.isOpen) document.body.style.overflow = "unset";
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
  editClose,
  editOpen,
  deleteClose,
  deleteOpen,
} = modelSlice.actions;
export default modelSlice.reducer;

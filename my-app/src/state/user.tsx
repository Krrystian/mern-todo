import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  id: string;
  email: string;
  username: string;
  token: string;
  todoList: any[];
  todo: any;
  selected: any;
}

const initialState: CounterState = {
  id: "",
  email: "",
  username: "",
  token: "",
  todoList: [],
  todo: "",
  selected: "",
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
    titleUpdate: (state, action) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.title = action.payload.title;
        }
        return todo;
      });
      state.todo.title = action.payload.title;
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo._id !== action.payload
      );
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    updateTasks: (state, action) => {
      if (action.payload.progressStage === "uncompleted") {
        state.todo.uncompleted = [...state.todo.uncompleted, action.payload];
        // eslint-disable-next-line
        state.todoList.map((todo) => {
          if (todo._id === state.todo._id) {
            todo.uncompleted = [...todo.uncompleted, action.payload];
          }
        });
      } else if (action.payload.progressStage === "inProgress") {
        state.todo.inProgress = [...state.todo.inProgress, action.payload];
        // eslint-disable-next-line
        state.todoList.map((todo) => {
          if (todo._id === state.todo._id) {
            todo.inProgress = [...todo.inProgress, action.payload];
          }
        });
      } else {
        state.todo.completed = [...state.todo.completed, action.payload];
        // eslint-disable-next-line
        state.todoList.map((todo) => {
          if (todo._id === state.todo._id) {
            todo.completed = [...todo.completed, action.payload];
          }
        });
      }
    },

    deleteTask: (state, action) => {
      if (action.payload.progressStage === "uncompleted") {
        state.todo.uncompleted = state.todo.uncompleted.filter(
          (task: any) => task._id !== action.payload.id
        );
      } else if (action.payload.progressStage === "inProgress") {
        state.todo.inProgress = state.todo.inProgress.filter(
          (task: any) => task._id !== action.payload.id
        );
      } else {
        state.todo.completed = state.todo.completed.filter(
          (task: any) => task._id !== action.payload.id
        );
      }
    },
    updateTask: (state, action) => {
      const updatedTask = {
        title: action.payload.title,
        description: action.payload.description,
        progressInclude: action.payload.format,
        progressStage: action.payload.progressStage,
        _id: action.payload.id,
      };
      switch (action.payload.stage) {
        case "uncompleted":
          state.todo.uncompleted = state.todo.uncompleted.map((task: any) =>
            task._id === action.payload.id ? updatedTask : task
          );
          break;
        case "inProgress":
          state.todo.inProgress = state.todo.inProgress.map((task: any) =>
            task._id === action.payload.id ? updatedTask : task
          );
          break;
        case "completed":
          state.todo.completed = state.todo.completed.map((task: any) =>
            task._id === action.payload.id ? updatedTask : task
          );
          break;
        default:
          break;
      }
      state.todo[action.payload.stage] = state.todo[
        action.payload.stage
      ].filter((task: any) => task._id !== action.payload.id);
      state.todo[action.payload.progressStage] = [
        ...state.todo[action.payload.progressStage],
        updatedTask,
      ];
      state.todoList = state.todoList.map((todo) => {
        if (todo._id === state.todo._id) {
          todo = state.todo;
        }
        return todo;
      });
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
  setSelected,
  titleUpdate,
  updateTasks,
  deleteTask,
  updateTask,
} = userSlice.actions;
export default userSlice.reducer;

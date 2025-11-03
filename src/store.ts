import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice";
import taskReducer from "./features/slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

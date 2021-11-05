import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
  usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

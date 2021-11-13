import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export const weekDays = [
  'שישי',
  'שבת',
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי'
];

export interface UserActivity {
  type: string;
  day: string;
}

export interface User {
  name: string;
  activities: UserActivity[];
}

// Define a type for the slice state
interface UsersState {
  users: User[];
}

// Define the initial state using that type
const initialState: UsersState = {
  users: []
};

export const counterSlice: Slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUser(state: UsersState, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    deleteUsers(state: UsersState) {
      state.users = [];
    }
  }
});

export const { addUser, deleteUsers } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice, Dispatch } from "@reduxjs/toolkit";

// Define the interface for the state managed by this slice
interface LoginState {
  isLoggedIn: boolean;
}

// Define the initial state for this slice
const initialState: LoginState = {
  isLoggedIn: false,
};

// Create a Redux slice for managing login state
export const mainSlice = createSlice({
  name: "login", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer for updating isLoggedIn after a successful login
    loginSuccess(state, action) {
      state.isLoggedIn = action.payload;
    },
    // Reducer for updating isLoggedIn after a successful logout
    logoutSuccess(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Export the reducer for this slice
export const { loginSuccess, logoutSuccess } = mainSlice.actions;
export const mainSliceReducer = mainSlice.reducer;

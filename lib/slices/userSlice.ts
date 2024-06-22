import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
}

const initialUserState: UserState = {
  name: '',
  displayName: '',
  email: '',
  isEmailVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserDetails: (state, action) => {
      const { name, displayName, email, isEmailVerified } = action.payload;
      state.name = name;
      state.displayName = displayName;
      state.email = email;
      state.isEmailVerified = isEmailVerified;
    },
    updateDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    toggleEmailVerification: (state) => {
      state.isEmailVerified = !state.isEmailVerified;
    },
    clearUserDetails: (state) => {
      state.name = '';
      state.displayName = '';
      state.email = '';
      state.isEmailVerified = false;
    },
  },
});

export const {
  setUserDetails,
  updateDisplayName,
  updateEmail,
  toggleEmailVerification,
  clearUserDetails,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

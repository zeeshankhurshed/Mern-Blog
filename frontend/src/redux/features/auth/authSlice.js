// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to load user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState !== null) {
      return { user: JSON.parse(serializedState) };
    }
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
  }
  return { user: null };
};

// Initial state
const initialState = loadUserFromLocalStorage();

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
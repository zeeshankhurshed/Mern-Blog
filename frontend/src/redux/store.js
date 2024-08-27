import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./features/blog/blogApi";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import commentApi from "./features/comment/commentApi";

 const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [blogApi.reducerPath]: blogApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [commentApi.reducerPath]:commentApi.reducer,
      auth:authReducer,
     
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogApi.middleware,authApi.middleware,commentApi.middleware),
  })

  export default store;
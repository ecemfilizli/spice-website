import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  token:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const authApiSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api/Auth` }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/Login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddUserMutation } = authApiSlice;

import { User, UserResponse } from "@/models/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: "not-authenticate" | "authenticated" | "pending";
  user: null | User;
  accessToken: null | string;
}

const INITIAL_STATE: AuthState = {
  status: "not-authenticate",
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserResponse>) => {
      const { accessToken, user } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.status = "authenticated";
    },
    setToken: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      state.accessToken = action.payload;
    },
    setLogout: (state) => {
      state.user = INITIAL_STATE.user,
      state.accessToken = INITIAL_STATE.accessToken,
      state.status = INITIAL_STATE.status
    },
  },
});

export const { setCredentials, setToken, setLogout } = authSlice.actions;

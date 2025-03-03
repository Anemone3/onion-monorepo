import { User, UserResponse } from "@/models/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: "not-authenticate" | "authenticated" | "pending";
  user: null | User;
  accessToken: null | string;
}

const INITIAL_STATE: AuthState = {
  status: "pending",
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserResponse>) => {
      const { accessToken, user } = action.payload;

      /* TODO: Mejorar el envio del accessToken, endpoints a mirar: (getProfile, [Login,Register]), esos dos envian de diferente manera */
      if (accessToken) {
        state.accessToken = accessToken;
      }
      state.user = user;
      state.status = "authenticated";
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLogout: (state) => {
      (state.user = INITIAL_STATE.user),
        (state.accessToken = INITIAL_STATE.accessToken),
        (state.status = "not-authenticate");
    },
    setPendingAuth: (state) => {
      state.status = "pending";
    },
    setNotAuthenticate: (state) => {
      state.status = "not-authenticate";
    },
  },
});

export const {
  setCredentials,
  setToken,
  setLogout,
  setPendingAuth,
  setNotAuthenticate,
} = authSlice.actions;

import { VITE_API } from "@/shared/envs";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { RefreshTokenResponse } from "@/models/register-request.interface";
import { setLogout, setPendingAuth, setToken } from "../slices/authslice";

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: VITE_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // Si el backend responde con 401, intentamos refrescar el token
  if (result.error && result.error.status === 401) {

    api.dispatch(setPendingAuth());
    

    console.log("Token expirado, intentando refrescar...");

    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions,
    );

    console.log(refreshResult)

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as RefreshTokenResponse)
        .accessToken;
      api.dispatch(setToken(newAccessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // Si falla la renovación, cerrar sesión
      console.log('Logout');
      
      await baseQuery(
        {
          url: "/auth/logout",
          method: "POST",
          credentials: 'include'
        },
        api,
        extraOptions,
      );

      api.dispatch(setLogout())
    }
  }

  return result;
};

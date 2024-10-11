import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "constants/endpoints";
import { setAuth } from "./auth/auth.slice";
import {
  getTokensFromStorage,
  removeAccessTokenFromStorage,
  removeRefreshTokenFromStorage,
  setAccessTokenToStorage,
  setRefreshTokenToStorage,
} from "helpers/tokens";

const prepareHeaders = (headers: any) => {
  const { access_token } = getTokensFromStorage();
  if (access_token) {
    headers.set("Authorization", `Bearer ${access_token}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  prepareHeaders: prepareHeaders,
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { refresh_token } = getTokensFromStorage();
    const refreshResult: any = await baseQuery(
      {
        url: `${API_URL}/auth/refresh`,
        method: "POST",
        headers: {
          "Authorization-Refresh": `Bearer ${refresh_token}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data && refreshResult.data.message) {
      setAccessTokenToStorage(refreshResult.data.message.access_token);
      setRefreshTokenToStorage(refreshResult.data.message.refresh_token);
      api.dispatch(setAuth(true));
      result = await baseQuery(args, api, extraOptions);
    } else {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      api.dispatch(setAuth(false));
    }
  }
  return result;
};

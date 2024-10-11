import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "store/baseQueryWithReauth";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<any, { login: string; password: string }>({
      query: (data) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export default authApi;

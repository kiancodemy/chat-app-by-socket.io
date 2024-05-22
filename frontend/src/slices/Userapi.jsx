import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",

        body: data,
      }),
    }),
    Login: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiregister;

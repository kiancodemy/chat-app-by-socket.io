import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Allusers: builder.query({
      query: (data) => `users/all?search=${data}`,
    }),
    Register: builder.mutation({
      query: (data) => ({
        url: `users/register`,
        method: "POST",

        body: data,
      }),
    }),
    Login: builder.mutation({
      query: (data) => ({
        url: `users/login`,
        method: "POST",
        body: data,
      }),
    }),

    Logout: builder.mutation({
      query: (data) => ({
        url: `users/logout`,
        method: "POST",

        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useAllusersQuery,
} = apiregister;

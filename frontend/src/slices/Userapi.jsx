import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Allusers: builder.query({
      query: (data) => {
        return { url: `/users/all?search=${data}`, credentials: "include" };
      },
    }),
    Register: builder.mutation({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        credentials: "include",

        body: data,
      }),
    }),
    Login: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        credentials: "include",

        method: "POST",
        body: data,
      }),
    }),

    Logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        credentials: "include",
        method: "POST",
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

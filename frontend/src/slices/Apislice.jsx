import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Myapi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SOME_KEY }),
  credentials: "include",

  endpoints: (builder) => ({}),
});

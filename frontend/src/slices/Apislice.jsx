import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Myapi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({}),
});
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Myapi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.BASE_URL }),
  endpoints: (builder) => ({}),
});

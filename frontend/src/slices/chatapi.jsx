import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Accesschat: builder.mutation({
      query: (data) => ({
        url: `chats`,
        method: "POST",
        credentials: "include",

        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Allchats: builder.query({
      query: (data) => "chats",
      credentials: "include",
      providesTags: ["all"],
    }),
    Creategroup: builder.mutation({
      query: (data) => ({
        url: `chats/group`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
  }),
});

export const {
  useAllchatsQuery,
  useAccesschatMutation,
  useCreategroupMutation,
} = apiregister;

import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Accesschat: builder.mutation({
      query: (data) => ({
        url: `/chats`,
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Allchats: builder.query({
      query: (data) => "/chats",
      providesTags: ["all"],
    }),
    Creategroup: builder.mutation({
      query: (data) => ({
        url: `/chats/group`,
        method: "POST",
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

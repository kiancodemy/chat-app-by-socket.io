import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Accesschat: builder.mutation({
      query: (data) => ({
        url: `chats`,
        method: "POST",
        credentials: "include",

        body: data,
        providesTags: ["all"],
      }),

      invalidatesTags: ["all"],
    }),
    Allchats: builder.query({
      query: (data) => {
        return { url: "chats", credentials: "include" };
      },

      providesTags: ["all"],
    }),

    Removegroup: builder.mutation({
      query: (data) => ({
        url: "chats/remove",
        credentials: "include",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Renamegroup: builder.mutation({
      query: (data) => ({
        url: "chats/rename",

        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["all"],
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
  useRenamegroupMutation,
  useAllchatsQuery,
  useRemovegroupMutation,
  useAccesschatMutation,
  useCreategroupMutation,
} = apiregister;

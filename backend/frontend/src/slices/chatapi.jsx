import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Accesschat: builder.mutation({
      query: (data) => ({
        url: `/chats`,
        method: "POST",
        credentials: "include",

        body: data,
        providesTags: ["all"],
      }),

      invalidatesTags: ["all"],
    }),
    Allchats: builder.query({
      query: (data) => {
        return { url: "/chats", credentials: "include" };
      },

      providesTags: ["all"],
    }),
    Getchatbyid: builder.mutation({
      query: (data) => ({
        url: `/chats/get/${data}`,
        method: "POST",
        credentials: "include",
      }),
    }),

    Removegroup: builder.mutation({
      query: (data) => ({
        url: "/chats/remove",
        credentials: "include",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Renamegroup: builder.mutation({
      query: (data) => ({
        url: "/chats/rename",

        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Creategroup: builder.mutation({
      query: (data) => ({
        url: "/chats/groups",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Sendmessage: builder.mutation({
      query: (data) => ({
        url: `message`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["all"],
    }),
    Allmessages: builder.query({
      query: (data) => {
        return { url: `/message/${data}`, credentials: "include" };
      },
    }),
  }),
});

export const {
  useRenamegroupMutation,
  useAllchatsQuery,
  useSendmessageMutation,
  useRemovegroupMutation,
  useGetchatbyidMutation,
  useAccesschatMutation,
  useCreategroupMutation,
  useAllmessagesQuery,
} = apiregister;

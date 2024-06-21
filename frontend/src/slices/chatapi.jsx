import { Myapi } from "./Apislice";

const apiregister = Myapi.injectEndpoints({
  endpoints: (builder) => ({
    Accesschat: builder.mutation({
      query: (data) => ({
        url: `chats`,
        method: "POST",
        credentials: "include",

        body: data,
        providesTags: ["access"],
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
      invalidatesTags: ["all", "access"],
    }),
  }),
});

export const {
  useAllchatsQuery,
  useRemovegroupMutation,
  useAccesschatMutation,
  useCreategroupMutation,
} = apiregister;

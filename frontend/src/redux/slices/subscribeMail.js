import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const subscribeMailSlice = createApi({
  reducerPath: "subscribemail",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/SubscribeMails`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SubscribeMail"],
  endpoints: (build) => ({
    getSubscribeMail: build.query({
      query: () =>
        "/get-all-subscribe-mails?Page=0&Size=100&IsActive=true&IsDeleted=false",
      providesTags: (result) =>
        result?.subForms
          ? [
              ...result.subForms.map(({ id }) => ({
                type: "SubscribeMail",
                id,
              })),
              { type: "SubscribeMail", id: "LIST" },
            ]
          : [{ type: "SubscribeMail", id: "LIST" }],
    }),
    getSubscribeMailById: build.query({
      query: (SubscribeMailId) =>
        `/get-by-id-subscribe-mail/${SubscribeMailId}`,
    }),
    addSubscribeMail: build.mutation({
      query(body) {
        return {
          url: "/add-subscribe-mail",
          method: "POST",
          body,
        };
      },
    }),
    updateSubscribeMail: build.mutation({
      query(body) {
        return {
          url: "/update-subscribe- mail",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "SubscribeMail", id: arg.SubscribeMailId },
      ],
    }),
    deleteSubscribeMail: build.mutation({
      query({ SubscribeMailId }) {
        return {
          url: `/delete-subscribe-mail/${SubscribeMailId}`,
          method: "DELETE",
          body: { SubscribeMailId },
        };
      },
      invalidatesTags: (result, error, { SubscribeMailId }) => [
        { type: "SubscribeMail", id: SubscribeMailId },
        { type: "SubscribeMail", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useGetSubscribeMailQuery,
  useLazyGetSubscribeMailByIdQuery,
  useGetSubscribeMailByIdQuery,
  useAddSubscribeMailMutation,
  useUpdateSubscribeMailMutation,
  useDeleteSubscribeMailMutation,
} = subscribeMailSlice;
export default subscribeMailSlice.reducer;

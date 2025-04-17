import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const contactSlice = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/ContactForms`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contact"],
  endpoints: (build) => ({
    getContact: build.query({
      query: () =>
        "/get-all-contact-forms?Page=0&Size=100&IsActive=true&IsDeleted=false",
      providesTags: (result) =>
        result?.contactForms
          ? [
              ...result.contactForms.map(({ id }) => ({
                type: "Contact",
                id,
              })),
              { type: "Contact", id: "LIST" },
            ]
          : [{ type: "Contact", id: "LIST" }],
    }),
    getContactById: build.query({
      query: (ContactFormId) => `/get-by-id-contact-form/${ContactFormId}`,
    }),
    addContact: build.mutation({
      query(body) {
        return {
          url: "/add-contact-form",
          method: "POST",
          body,
        };
      },
    }),
    updateContact: build.mutation({
      query(body) {
        return {
          url: "/update-contact",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Contact", id: arg.ContactFormId },
      ],
    }),
    deleteContact: build.mutation({
      query({ ContactFormId }) {
        return {
          url: `/delete-contact-form/${ContactFormId}`,
          method: "DELETE",
          body: { ContactFormId },
        };
      },
      invalidatesTags: (result, error, { ContactFormId }) => [
        { type: "Contact", id: ContactFormId },
        { type: "Contact", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useGetContactQuery,
  useLazyGetContactByIdQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactSlice;
export default contactSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const categorySlice = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/Categories`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () =>
        "/get-all-categories?Page=0&Size=100&IsActive=true&IsDeleted=false",
      providesTags: (result) =>
        result?.category
          ? [
              ...result.category.map(({ id }) => ({
                type: "Category",
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    getCategorytById: build.query({
      query: (CategoryId) => `/get-by-id-category/${CategoryId}`,
    }),
    addCategory: build.mutation({
      query(body) {
        return {
          url: "/add-category",
          method: "POST",
          body,
        };
      },
      providesTags: (result) =>
        result?.category
          ? [
              ...result.category.map(({ id }) => ({
                type: "Category",
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: build.mutation({
      query(body) {
        return {
          url: "/update-category",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { CategoryId }) => [
        { type: "Category", id: CategoryId },
        { type: "Category", id: "LIST" },
      ],
    }),
    deleteCategory: build.mutation({
      query({ CategoryId }) {
        return {
          url: `/delete-category/${CategoryId}`,
          method: "DELETE",
          body: { CategoryId },
        };
      },
      invalidatesTags: (result, error, { CategoryId }) => [
        { type: "Category", id: CategoryId },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useLazyGetCategorytByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
export default categorySlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const productContactSlice = createApi({
  reducerPath: "productContact",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/ProductContactForms`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ProductContact"],
  endpoints: (build) => ({
    getProductContact: build.query({
      query: () =>
        "/get-all--product-contact-forms?Page=0&Size=100&IsActive=true&IsDeleted=false",
      providesTags: (result) =>
        result?.productForms
          ? [
              ...result.productForms.map(({ id }) => ({
                type: "ProductContact",
                id,
              })),
              { type: "ProductContact", id: "LIST" },
            ]
          : [{ type: "ProductContact", id: "LIST" }],
    }),
    getProductContactById: build.query({
      query: (ProductContactFormId) =>
        `/get-by-id--product-contact-form/${ProductContactFormId}`,
    }),
    addProductContact: build.mutation({
      query(body) {
        return {
          url: "/add-product-contact-form",
          method: "POST",
          body,
        };
      },
    }),
    updateProductContact: build.mutation({
      query(body) {
        return {
          url: "/update-productContact",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "ProductContact", id: arg.ProductContactFormId },
      ],
    }),
    deleteProductContact: build.mutation({
      query({ ProductContactFormId }) {
        return {
          url: `/delete-product-contact-form/${ProductContactFormId}`,
          method: "DELETE",
          body: { ProductContactFormId },
        };
      },
      invalidatesTags: (result, error, { ProductContactFormId }) => [
        { type: "ProductContact", id: ProductContactFormId },
        { type: "ProductContact", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useGetProductContactQuery,
  useLazyGetProductContactByIdQuery,
  useGetProductContactByIdQuery,
  useAddProductContactMutation,
  useDeleteProductContactMutation,
  useUpdateProductContactMutation,
} = productContactSlice;
export default productContactSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const productSlice = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/Products`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () =>
        "/get-all-products-grouped-by-category?Page=0&Size=100&IsActive=true&IsDeleted=false",
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: build.query({
      query: (ProductId) => `/get-by-id-product/${ProductId}`,
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    addProducts: build.mutation({
      query(formData) {
        return {
          url: "/add-all-product",
          method: "POST",
          body: formData,
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    addImageProduct: build.mutation({
      query(formData) {
        return {
          url: "/upload-file-product",
          method: "POST",
          body: formData,
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    updateProducts: build.mutation({
      query(body) {
        return {
          url: "/update-product",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { ProductId }) => [
        { type: "Product", id: ProductId },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProducts: build.mutation({
      query({ ProductId }) {
        return {
          url: `/delete-product/${ProductId}`,
          method: "DELETE",
          body: { ProductId },
        };
      },
      invalidatesTags: (result, error, { ProductId }) => [
        { type: "Product", id: ProductId },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteImageProduct: build.mutation({
      query({ ImageId }) {
        return {
          url: `/delete-file-product/${ImageId}`,
          method: "DELETE",
          body: { ImageId },
        };
      },
      invalidatesTags: (result, error, { ImageId }) => [
        { type: "Product", id: ImageId },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useLazyGetProductByIdQuery,
  useGetProductByIdQuery,
  useAddProductsMutation,
  useAddImageProductMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useDeleteImageProductMutation,
} = productSlice;
export default productSlice.reducer;

// async queryFn(formData, api, extraOptions, baseQuery) {
//   try {
//     const token = api.getState().auth.token;

//     const response = await fetch(
//       `${apiUrl}/api/Products/add-all-product`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return { error: { status: response.status, data } };
//     }

//     return { data };
//   } catch (error) {
//     return { error: { status: 500, data: error.message } };
//   }
// },

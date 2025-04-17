import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const productFeatures = createApi({
  reducerPath: "productFeatures",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/ProductFeatures`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ProductFeatures"],
  endpoints: (build) => ({
    addProductFeatures: build.mutation({
      query(body) {
        return {
          url: "/add-product-features",
          method: "POST",
          body,
        };
      },
      providesTags: (result) =>
        result?.ProductFeatures
          ? [
              ...result.ProductFeatures.map(({ id }) => ({
                type: "ProductFeatures",
                id,
              })),
              { type: "ProductFeatures", id: "LIST" },
            ]
          : [{ type: "ProductFeatures", id: "LIST" }],
    }),
    updateProductFeatures: build.mutation({
      query(body) {
        return {
          url: "/update-product-features",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { ProductFeaturesId }) => [
        { type: "ProductFeatures", id: ProductFeaturesId },
        { type: "ProductFeatures", id: "LIST" },
      ],
    }),
    deleteProductFeatures: build.mutation({
      query({ ProductFeaturesId }) {
        return {
          url: `/delete-product-features/${ProductFeaturesId}`,
          method: "DELETE",
          body: { ProductFeaturesId },
        };
      },
      invalidatesTags: (result, error, { ProductFeaturesId }) => [
        { type: "ProductFeatures", id: ProductFeaturesId },
        { type: "ProductFeatures", id: "LIST" },
      ],
    }),
  }),
});
export const {
  useAddProductFeaturesMutation,
  useUpdateProductFeaturesMutation,
  useDeleteProductFeaturesMutation,
} = productFeatures;
export default productFeatures.reducer;

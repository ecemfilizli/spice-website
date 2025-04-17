"use client";
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "../design/Loader";

const Grid = () => {
  const { data } = useGetProductsQuery();
  const router = useRouter();

  if (!data)
    return (
      <>
        <Loader />
      </>
    );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";
  return (
    <div>
      {data?.products?.map((categoryItem) => (
        <div key={categoryItem.category} className="mb-4">
          <h2 className="products_category_title">
            {categoryItem.category} ({categoryItem.products.length})
          </h2>
          <div className="products_list">
            {categoryItem.products.map((product) => (
              <div
                key={product.id}
                className={`products_list_item`}
                onClick={() =>
                  router.push(
                    `/products/${product.productName}?id=${product.id}`
                  )
                }
              >
                <div
                  className={`products_list_item_image relative ${
                    product.productImageFiles?.[1] ? "group" : ""
                  }`}
                >
                  {product.productImageFiles?.[0] && (
                    <Image
                      src={
                        apiUrl +
                        product.productImageFiles[0].path.replace(/\\/g, "/")
                      }
                      alt=""
                      fill
                      className="img1"
                    />
                  )}

                  {product.productImageFiles?.[1] && (
                    <Image
                      src={
                        apiUrl +
                        product.productImageFiles[1].path.replace(/\\/g, "/")
                      }
                      alt=""
                      fill
                      className="img2"
                    />
                  )}
                </div>
                <div className="products_list_item_name">
                  {product.productName}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;

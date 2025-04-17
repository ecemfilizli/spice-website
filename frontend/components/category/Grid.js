"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import Loader from "../design/Loader";

const Grid = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetProductsQuery();

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (!data) return <div>Not Found</div>;

  const categoryMatch = data.products.find(
    (item) => item.category.toLowerCase() === id.toLowerCase()
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";

  return (
    <div>
      <h1 className="products_category_title">{id} Ürünleri</h1>
      {categoryMatch ? (
        <div className="products_list">
          {categoryMatch.products.map((product) => (
            <div
              key={product.id}
              className="products_list_item cursor-pointer"
              onClick={() =>
                router.push(`/products/${product.productName}?id=${product.id}`)
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
              <div className="products_list2_item_name">
                {product.productName}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default Grid;

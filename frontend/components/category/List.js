import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import {
  IoAirplane,
  IoBoat,
  IoCart,
  IoEllipseSharp,
  IoLocation,
} from "react-icons/io5";
import Loader from "../design/Loader";

const List = () => {
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
        <div className="products_list2">
          {categoryMatch.products.map((product) => (
            <div
              key={product.id}
              className="products_list2_item cursor-pointer"
              onClick={() =>
                router.push(`/products/${product.productName}?id=${product.id}`)
              }
            >
              <div className="products_list2_item_info">
                <div
                  className={`products_list2_item_image relative ${
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

                <div className="products_list2_item_desc">
                  {product.description}
                </div>
                <div className="products_list2_item_widget_container">
                  <div className="products_list2_item_widget_container_item">
                    <IoEllipseSharp
                      className="products_list2_item_widget_ico"
                      style={{
                        color: product.stock ? "green" : "red",
                      }}
                    />
                    <div className="products_list2_item_widget">
                      {product.stock ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>

                  <div className="products_list2_item_widget_container_item">
                    <IoCart className="products_list2_item_widget_ico" />
                    <div className="products_list2_item_widget">
                      {product.minOrder}
                    </div>
                  </div>
                  <div className="products_list2_item_widget_container_item">
                    {product.transportation === "plane" ? (
                      <IoAirplane className="products_list2_item_widget_ico" />
                    ) : (
                      <IoBoat className="products_list2_item_widget_ico" />
                    )}
                    <div className="products_list2_item_widget">
                      {product.transportation}
                    </div>
                  </div>

                  <div className="products_list2_item_widget_container_item">
                    <IoLocation className="products_list2_item_widget_ico" />
                    <div className="products_list2_item_widget">
                      {product.placeOrigin}
                    </div>
                  </div>
                </div>
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

export default List;

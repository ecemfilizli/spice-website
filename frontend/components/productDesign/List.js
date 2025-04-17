import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  IoAirplane,
  IoBoat,
  IoCart,
  IoEllipseSharp,
  IoLocation,
} from "react-icons/io5";

const List = () => {
  const { data } = useGetProductsQuery();
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  const handleItemClick = (id) => {};

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";

  return (
    <div>
      {data.products?.map((categoryItem) => (
        <div key={categoryItem.category} className="mb-4">
          <h2 className="products_category_title">
            {categoryItem.category} ({categoryItem.products.length})
          </h2>
          <div className="products_list2">
            {categoryItem.products.map((product) => (
              <div
                key={product.id}
                className={`products_list2_item`}
                onClick={() =>
                  router.push(
                    `/products/${product.productName}?id=${product.id}`
                  )
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
        </div>
      ))}
    </div>
  );
};

export default List;

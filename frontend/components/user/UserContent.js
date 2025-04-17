// "use client";

// import { useGetProductsQuery } from "@/redux/slices/productSlice";
// import React from "react";

// const UserContent = () => {
//   const { data: productsData } = useGetProductsQuery();

//   return (
//     <div className="userContent_container">
//       <div>
//         {productsData?.products?.map((categoryItem) => (
//           <div key={categoryItem.category} className="products_container">
//             <h2 className="products_category_title">{categoryItem.category}</h2>
//             <div className="ml-4">
//               {categoryItem.products.map((product, index) => (
//                 <div key={index}>{product.productName}</div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserContent;
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserProductIdModal from "./UserProductIdModal";

const UserContent = () => {
  const [isShow, setIsShow] = useState(false);
  const [isClickProduct, setIsClickProduct] = useState([]);

  const { data: productsData, refetch } = useGetProductsQuery();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";

  const handleClick = (id) => {
    setIsShow(true);
    setIsClickProduct(id);
  };
  return (
    <div className="userContent_container">
      <div className="user_products_container">
        {productsData?.products?.map((categoryItem) => (
          <div key={categoryItem.category} className="mb-8">
            <h2 className="products_category_title">{categoryItem.category}</h2>

            <table className="table_title">
              <tbody className="products_container_body">
                {categoryItem.products.map((product) => (
                  <tr
                    key={product.id}
                    className="products_container_tableBody"
                    onClick={() => handleClick(product.id)}
                  >
                    <td className="products_container_image ">
                      <Image
                        src={
                          apiUrl +
                          `${product.productImageFiles?.[0]?.path.replace(
                            /\\/g,
                            "/"
                          )}`
                        }
                        alt={product.productName}
                        fill
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border">{product.productName}</td>

                    <td className="p-2 border">{product.price} ₺</td>
                    <td className="p-2 border">
                      {product.stock ? "In Stock" : "Out of Stock"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {isShow && (
        <UserProductIdModal
          id={isClickProduct}
          onClose={() => setIsShow(false)}
        />
      )}
    </div>
  );
};

export default UserContent;
//   <thead className="products_container_1">
//     <tr className="products_container_tableBody">
//       <th className="p-2 border">Görsel</th>
//       <th className="p-2 border">Ürün Adı</th>
//       <th className="p-2 border">Fiyat</th>

//       <th className="p-2 border">Stok</th>
//     </tr>
//   </thead>
// <td className="p-2 border">
//                     <ul className="list-disc ml-4">
//                       {product.productFeatures?.slice(0, 3).map((f) => (
//                         <li key={f.id} className="text-sm">
//                           {f.titleName}
//                         </li>
//                       ))}
//                       {product.productFeatures?.length > 3 && <li>...</li>}
//                     </ul>
//                   </td>

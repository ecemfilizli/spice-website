"use client";

import {
  useDeleteProductContactMutation,
  useGetProductContactQuery,
} from "@/redux/slices/productContactForm";
import { useGetProductByIdQuery } from "@/redux/slices/productSlice";
import React from "react";
import Loader from "../design/Loader";

const ProductName = ({ ProductId }) => {
  const { data, isLoading, isError } = useGetProductByIdQuery(ProductId);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (isError || !data) return <span>Ürün bulunamadı</span>;

  return (
    <div className="userModal_item" title="Product Name">
      {data.productName}
    </div>
  );
};

const ProductFormModal = ({ onClose }) => {
  const { data: contactProductFormData, isLoading } =
    useGetProductContactQuery();
  const [deleteProductContact] = useDeleteProductContactMutation();

  const handleDelete = async (ProductContactFormId) => {
    try {
      await deleteProductContact({ ProductContactFormId }).unwrap();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <div className="userModal_container">
      <div className="userModal_content">
        <button onClick={onClose} className="closeButton">
          Close
        </button>
        <div className="userModal_item">
          <h2 className="userModal_title">
            Products Contact (
            {contactProductFormData?.totalProductContactFormCount})
          </h2>
        </div>
        {contactProductFormData?.productContactForms.map((item) => (
          <div key={item.id}>
            <div className="mailModalText prose prose-sm space-y-4">
              <div className="userModal_item">
                <h2 className="userModal_title">
                  <ProductName ProductId={item.productId} />
                </h2>
              </div>
              <div className="userModal_item" title="Name Surname">
                {item.nameSurname}
              </div>
              <div className="userModal_item" title="Phone">
                {item.phone}
              </div>
              <div className="userModal_item" title="Email">
                {item.email}
              </div>
              <div className="userModal_item" title="Message">
                {item.message}
              </div>
              <button
                className="user_item_allButton"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFormModal;

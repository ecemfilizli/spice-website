"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserContent from "../../../components/user/UserContent";
import ContactFormModal from "../../../components/mailCheck/ContactFormModal";
import ProductFormModal from "../../../components/mailCheck/ProductFormModal";
import SubscribeFormModal from "../../../components/mailCheck/SubscribeFormModal";
import UserProductAddModal from "../../../components/user/UserProductAddModal";
import UserCategoryModal from "../../../components/user/UserCategoryModal";
import {
  IoCart,
  IoChevronBackCircleOutline,
  IoMailOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import Link from "next/link";

const User = () => {
  const token = useSelector((state) => state.auth.token);
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="admin_container">
      <div className="admin_container_buttons">
        <button
          className="admin_container_button"
          onClick={() => setActiveModal("contact")}
        >
          <p>Contact Form</p>
          <IoMailOutline />
        </button>
        <button
          className="admin_container_button"
          onClick={() => setActiveModal("productform")}
        >
          <p>Product Form</p>
          <IoMailOutline />
        </button>
        <button
          className="admin_container_button"
          onClick={() => setActiveModal("subscribe")}
        >
          <p>Subscribe Email</p>
          <IoMailOutline />
        </button>
        <button
          className="admin_container_button"
          onClick={() => setActiveModal("addproduct")}
        >
          <p>Add Product</p>
          <IoCart />
        </button>
        <button
          className="admin_container_button"
          onClick={() => setActiveModal("category")}
        >
          <p>category operations</p>
          <IoSettingsOutline />
        </button>
      </div>
      <UserContent />
      <Link className="product_item_4" href="/">
        <IoChevronBackCircleOutline className="fIcon" />
      </Link>

      {activeModal === "contact" && <ContactFormModal onClose={closeModal} />}
      {activeModal === "productform" && (
        <ProductFormModal onClose={closeModal} />
      )}
      {activeModal === "subscribe" && (
        <SubscribeFormModal onClose={closeModal} />
      )}

      {activeModal === "addproduct" && (
        <UserProductAddModal onClose={closeModal} />
      )}
      {activeModal === "category" && <UserCategoryModal onClose={closeModal} />}
    </div>
  );
};

export default User;

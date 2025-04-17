"use client";
import { useAddProductContactMutation } from "@/redux/slices/productContactForm";
import React, { useState } from "react";

const ProductContactForm = ({ id: productId, onClose }) => {
  const [formData, setFormData] = useState({
    nameSurname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [addProductContact, { isLoading }] = useAddProductContactMutation();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMessage = async () => {
    try {
      await addProductContact({ ...formData, productId }).unwrap();
      setSuccess(true);
      setFormData({
        nameSurname: "",
        phone: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Gönderme hatası:", error);
    }
  };

  return (
    <div className="modal_1 modal-overlay">
      <div className="modal_2">
        <div className="modal_header">
          <h2 className="text-lg font-semibold">Bu ürün için iletişime geç!</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        <div className="modal_info">
          <label htmlFor="nameSurname">Ad Soyad:</label>
          <input
            type="text"
            name="nameSurname"
            value={formData.nameSurname}
            onChange={handleChange}
            className="subInput"
            required
          />
        </div>

        <div className="modal_info">
          <label htmlFor="phone">Telefon:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="subInput"
            required
          />
        </div>

        <div className="modal_info">
          <label htmlFor="email">E-posta:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="subInput"
            required
          />
        </div>

        <div className="modal_info">
          <label htmlFor="message">Mesaj:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="subInput"
            rows={3}
          />
        </div>

        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="check_allButton mt-4"
        >
          {isLoading ? "Gönderiliyor..." : "SEND"}
        </button>

        {success && (
          <p className="text-green-500 mt-2">Mesaj başarıyla gönderildi!</p>
        )}
      </div>
    </div>
  );
};

export default ProductContactForm;

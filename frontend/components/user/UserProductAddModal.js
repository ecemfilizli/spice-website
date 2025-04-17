"use client";
import { useGetCategoriesQuery } from "@/redux/slices/categorySlice";
import { useAddProductsMutation } from "@/redux/slices/productSlice";
import React, { useState } from "react";

const UserProductAddModal = ({ onClose }) => {
  const [addProduct] = useAddProductsMutation();
  const { data: dataCategory, isLoading } = useGetCategoriesQuery();

  const [form, setForm] = useState({
    productName: "",
    price: "",
    stock: true,
    title: "",
    description: "",
    packaging: "",
    minOrder: "",
    transportation: "",
    placeOrigin: "",
    keyword: "",
    categoryId: "",
  });

  const [productFeature, setProductFeature] = useState([
    { titleName: "", description: "" },
  ]);

  const [productImages, setProductImages] = useState([
    { description: "", file: null },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...productFeature];
    updated[index][field] = value;
    setProductFeature(updated);
  };

  const addFeature = () =>
    setProductFeature([...productFeature, { titleName: "", description: "" }]);

  const removeFeature = (index) => {
    const updated = [...productFeature];
    updated.splice(index, 1);
    setProductFeature(updated);
  };

  const handleImageChange = (index, field, value) => {
    const updated = [...productImages];
    updated[index][field] = value;
    setProductImages(updated);
  };

  const addImage = () =>
    setProductImages([...productImages, { description: "", file: null }]);

  const removeImage = (index) => {
    const updated = [...productImages];
    updated.splice(index, 1);
    setProductImages(updated);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Temel string ve boolean alanlar
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "productFeature" && key !== "productImages") {
        formData.append(
          key,
          typeof value === "boolean" ? value.toString() : value
        );
      }
    });

    // Özellikleri JSON olarak string'e çevirip gönder
    formData.append("productFeatures", JSON.stringify(productFeature));

    // Açıklamayı toplu ekliyoruz (ilk açıklamayı örnek olarak alalım)
    const descriptions = productImages
      .map((img) => img.description)
      .filter(Boolean);
    formData.append("productImageFileDescription", descriptions.join(", "));

    // Sadece dosyaları ekle (description alanı backend'de kullanılmıyor)
    productImages.forEach((img) => {
      if (img.file) {
        formData.append("productImageFiles", img.file);
      }
    });

    // Gönderimi test et
    try {
      const response = await addProduct(formData).unwrap();
      console.log("Ürün eklendi:", response);
      alert("Ürün başarıyla eklendi!");
      onClose();
    } catch (err) {
      console.error("Ürün ekleme hatası:", err);
      alert("Ürün eklenemedi.");
    }
  };

  return (
    <div className="footerModal_container">
      <div className="footerModal_content">
        <button onClick={onClose} className="closeButton">
          Close
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.entries(form).map(([key, val]) => {
            if (key === "categoryId") return null;

            return (
              <div key={key} className="userModal_item_edit userModal_item ">
                <label className="userModal_title">{key}</label>
                {typeof val === "boolean" ? (
                  <input
                    type="checkbox"
                    name={key}
                    checked={val}
                    className="input_modal"
                    placeholder="+"
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={val}
                    placeholder="+"
                    onChange={handleChange}
                    className="input_modal"
                  />
                )}
              </div>
            );
          })}

          {/* Kategori Seçimi */}
          <div className="userModal_item_edit userModal_item ">
            <label className="userModal_title">Kategori</label>
            {isLoading ? (
              <p>Kategoriler yükleniyor...</p>
            ) : (
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Kategori seçiniz</option>
                {dataCategory?.categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Dinamik Özellikler */}
          <div>
            <label className="userModal_title">Ürün Özellikleri</label>
            {productFeature.map((feature, index) => (
              <div key={index} className="userModal_item_edit userModal_item ">
                <input
                  type="text"
                  placeholder="Başlık"
                  value={feature.titleName}
                  onChange={(e) =>
                    handleFeatureChange(index, "titleName", e.target.value)
                  }
                  className="input_modal"
                />
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  className="input_modal"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="see_item_allButton"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="see_item_allButton"
            >
              + Özellik Ekle
            </button>
          </div>
          {/* Dinamik Özellikler */}

          {/* Dinamik Resimler */}
          <div>
            <label className="userModal_title">Ürün Görselleri</label>
            {productImages.map((img, index) => (
              <div key={index} className="userModal_item_edit userModal_item ">
                <input
                  type="text"
                  placeholder="Görsel açıklaması"
                  value={img.description}
                  onChange={(e) =>
                    handleImageChange(index, "description", e.target.value)
                  }
                  className="input_modal"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(index, "file", e.target.files[0])
                  }
                  className="input_modal"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="see_item_allButton"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              className="see_item_allButton"
            >
              + Görsel Ekle
            </button>
          </div>

          <button type="submit" className="user_item_allButton">
            Ürün Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProductAddModal;

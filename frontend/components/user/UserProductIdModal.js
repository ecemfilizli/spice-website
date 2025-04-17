import { useGetCategoriesQuery } from "@/redux/slices/categorySlice";
import {
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useUpdateProductsMutation,
} from "@/redux/slices/productSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../design/Loader";
import { useDeleteProductFeaturesMutation } from "@/redux/slices/productFeatures";
import UserProductFeaturesUpdateModal from "./UserProductFeaturesUpdateModal";
import UserProductFeaturesAddModal from "./UserProductFeaturesAddModal";
import { IoAddOutline, IoPencil, IoTrashOutline } from "react-icons/io5";

const UserProductIdModal = ({ id, onClose }) => {
  const {
    data: dataProduct,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductsMutation();

  const { data: dataCategory } = useGetCategoriesQuery();
  console.log(dataCategory);
  const [deleteProduct] = useDeleteProductsMutation();
  const [deleteProductFeatures] = useDeleteProductFeaturesMutation();

  const [isProductFeatures, setIsProductFeatures] = useState(null);
  const [isAddProductFeatures, setIsAddProductFeatures] = useState(false);

  const handleDelete = async (ProductId) => {
    try {
      await deleteProduct({ ProductId }).unwrap();
      onClose();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };
  const handleDeleteProductFeatures = async (ProductFeaturesId) => {
    console.log(ProductFeaturesId);
    try {
      await deleteProductFeatures({ ProductFeaturesId }).unwrap();
      refetch();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    productId: id,
    productName: "",
    price: 0,
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

  useEffect(() => {
    if (dataProduct && id && dataCategory?.categories) {
      const selectedCategory = dataCategory.categories.find(
        (cat) => cat.categoryName === dataProduct.categoryName
      );
      setForm((prev) => ({
        ...prev,
        productId: id,
        productName: dataProduct.productName || "",
        price: dataProduct.price || 0,
        stock: dataProduct.stock || false,
        title: dataProduct.title || "",
        description: dataProduct.description || "",
        packaging: dataProduct.packaging || "",
        minOrder: dataProduct.minOrder || "",
        transportation: dataProduct.transportation || "",
        placeOrigin: dataProduct.placeOrigin || "",
        keyword: dataProduct.keyword || "",
        categoryId: selectedCategory?.id || "",
      }));
    }
  }, [dataProduct, id, dataCategory]);

  const handleUpdateClick = async () => {
    try {
      await updateProduct(form).unwrap();
      alert("Ürün başarıyla güncellendi!");
      setIsEditMode(false);
      refetch();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Bir hata oluştu.");
    }
  };
  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (error || !dataProduct) return <div>Error loading product data.</div>;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";

  const {
    productName,
    price,
    stock,
    title,
    description,
    packaging,
    minOrder,
    transportation,
    placeOrigin,
    categoryName,
    productImageFiles,
    productFeatures,
  } = dataProduct;

  return (
    <div className="userModal_container">
      <div className="userModal_content">
        <button onClick={onClose} className="closeButton">
          Close
        </button>
        {!isEditMode && (
          <div className="userModalText prose prose-sm space-y-4">
            <div className="userModal_item">
              <h2 className="userModal_title">{productName}</h2>

              {/* Image */}
              <div className="products_container_image ">
                {productImageFiles?.length > 0 && (
                  <Image
                    src={
                      apiUrl +
                      `${productImageFiles?.[0]?.path.replace(/\\/g, "/")}`
                    }
                    alt=""
                    fill
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="userModal_item">
              <strong>Açıklama:</strong> {description}
            </div>
            <div className="userModal_item">
              <strong>Fiyat:</strong> {price} ₺
            </div>
            <div className="userModal_item">
              <strong>Stok Durumu:</strong>{" "}
              {stock ? "In Stock" : "Out of Stock"}
            </div>
            <div className="userModal_item">
              <strong>Kategori:</strong> {categoryName}
            </div>
            <div className="userModal_item">
              <strong>Paketleme:</strong> {packaging}
            </div>
            <div className="userModal_item">
              <strong>Min. Sipariş:</strong> {minOrder}
            </div>
            <div className="userModal_item">
              <strong>Taşıma Yöntemi:</strong> {transportation}
            </div>
            <div className="userModal_item">
              <strong>Menşei:</strong> {placeOrigin}
            </div>

            {/* Features */}
            {productFeatures?.length > 0 && (
              <div>
                <div className="userModal_item_edit_1 userModal_item">
                  <h3 className="userModal_item">Ürün Özellikleri:</h3>
                  <button
                    onClick={() => setIsAddProductFeatures(true)}
                    className="see_item_allButton "
                  >
                    <IoAddOutline />
                  </button>
                </div>

                <div className="list-disc ml-6">
                  {productFeatures.map((feature) => (
                    <div
                      className="userModal_item features_buttons"
                      key={feature.id}
                    >
                      <p>
                        <strong>{feature.titleName}</strong>
                      </p>
                      <p>{feature.description}</p>
                      <button
                        className="see_item_allButton"
                        onClick={() => setIsProductFeatures(feature.id)}
                      >
                        Edit <IoPencil />
                      </button>
                      <button
                        className="see_item_allButton"
                        onClick={() => handleDeleteProductFeatures(feature.id)}
                      >
                        Delete <IoTrashOutline />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              className="user_item_allButton"
              onClick={() => handleDelete(id)}
            >
              Delete{" "}
            </button>
            <button
              onClick={() => setIsEditMode(true)}
              className="category_item_allButton "
            >
              update
            </button>
          </div>
        )}
        {isEditMode && (
          <div className="update_container">
            <label>
              Ürün Adı:
              <input
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
                className="inputStyle"
              />
            </label>

            <label>
              Fiyat:
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="inputStyle"
              />
            </label>

            <label>
              Açıklama:
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="inputStyle"
              />
            </label>

            <label>
              Stok:
              <select
                value={String(form.stock)}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value === "true" })
                }
              >
                <option value="true">Var</option>
                <option value="false">Yok</option>
              </select>
            </label>

            <label>
              Kategori:
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="inputStyle"
              >
                {dataCategory?.categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Başlık:
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="inputStyle"
              />
            </label>

            <label>
              Paketleme:
              <input
                value={form.packaging}
                onChange={(e) =>
                  setForm({ ...form, packaging: e.target.value })
                }
                className="inputStyle"
              />
            </label>

            <label>
              Min. Sipariş:
              <input
                value={form.minOrder}
                onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                className="inputStyle"
              />
            </label>

            <label>
              Taşıma:
              <input
                value={form.transportation}
                onChange={(e) =>
                  setForm({ ...form, transportation: e.target.value })
                }
                className="inputStyle"
              />
            </label>

            <label>
              Menşei:
              <input
                value={form.placeOrigin}
                onChange={(e) =>
                  setForm({ ...form, placeOrigin: e.target.value })
                }
                className="inputStyle"
              />
            </label>

            <label>
              Anahtar Kelime:
              <input
                value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })}
                className="inputStyle"
              />
            </label>

            <button
              onClick={handleUpdateClick}
              className="category_item_allButton"
            >
              Güncellemeyi Kaydet
            </button>
          </div>
        )}
        {isProductFeatures && (
          <UserProductFeaturesUpdateModal
            productFeatures={isProductFeatures}
            productId={id}
            onclose={onClose}
            refetch={refetch}
          />
        )}
        {isAddProductFeatures && (
          <UserProductFeaturesAddModal
            productId={id}
            onclose={onClose}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

// UserProductFeaturesUpdateModal.js;

export default UserProductIdModal;

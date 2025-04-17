import React, { useEffect, useState } from "react";
import { useUpdateProductFeaturesMutation } from "@/redux/slices/productFeatures";

const UserProductFeaturesUpdateModal = ({
  productFeatures,
  onclose,
  productId,
  refetch,
}) => {
  const [updateProductFeatures] = useUpdateProductFeaturesMutation();

  const [form, setForm] = useState({
    ProductFeaturesId: productFeatures,
    productId: "",
    titleName: "",
    description: "",
  });

  useEffect(() => {
    if (productFeatures && productId) {
      setForm({
        ProductFeaturesId: productFeatures,
        productId: productId,
        titleName: productFeatures.titleName || "",
        description: productFeatures.description || "",
      });
    }
  }, [productFeatures, productId]);

  const handleSubmit = async () => {
    try {
      await updateProductFeatures(form).unwrap();
      alert("Ürün özelliği güncellendi!");
      onclose();
      refetch();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Ürün Özelliğini Güncelle</h2>

        <label className="block">
          Başlık:
          <input
            type="text"
            value={form.titleName}
            onChange={(e) => setForm({ ...form, titleName: e.target.value })}
            className="w-full border px-2 py-1 mt-1 rounded"
          />
        </label>

        <label className="block">
          Açıklama:
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-2 py-1 mt-1 rounded"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            onClick={onclose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProductFeaturesUpdateModal;

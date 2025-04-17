// import { useAddProductFeaturesMutation } from "@/redux/slices/productFeatures";
// import React from "react";

// const UserProductFeaturesAddModal = ({ onclose, productId }) => {
//   console.log("prod", productId);
//   const [addProductFeatures] = useAddProductFeaturesMutation();
//   const [newName, setNewName] = useState("");
//   const [newDesc, setNewDesc] = useState("");

//   const handleAddCat = async (item) => {
//     try {
//       const newprodfeatures = {
//         productId: productId,
//         titleName: newName,
//         description: newDesc,
//       };
//       await addProductFeatures(newprodfeatures).unwrap();
//       setNewName("");
//       setNewDesc("");
//       onclose();

//       refetch();
//     } catch (err) {
//       console.error("ekleme hatası:", err);
//     }
//   };
//   return (
//     <div>
//       {" "}
//       <div>
//         <label className="userModal_title">Ürün Özellikleri</label>
//         {productFeature.map((feature, index) => (
//           <div key={index} className="userModal_item_edit userModal_item ">
//             <input
//               type="text"
//               placeholder="Başlık"
//               value={feature.titleName}
//               onChange={(e) =>
//                 handleFeatureChange(index, "titleName", e.target.value)
//               }
//               className="input_modal"
//             />
//             <input
//               type="text"
//               placeholder="Açıklama"
//               value={feature.description}
//               onChange={(e) =>
//                 handleFeatureChange(index, "description", e.target.value)
//               }
//               className="input_modal"
//             />
//             <button
//               type="button"
//               onClick={() => removeFeature(index)}
//               className="see_item_allButton"
//             >
//               X
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addFeature}
//           className="see_item_allButton"
//         >
//           + Özellik Ekle
//         </button>
//       </div>

//     </div>
//   );
// };

// export default UserProductFeaturesAddModal;

import React, { useState } from "react";
import { useAddProductFeaturesMutation } from "@/redux/slices/productFeatures";

const UserProductFeaturesAddModal = ({ onclose, productId, refetch }) => {
  const [addProductFeatures] = useAddProductFeaturesMutation();
  const [productFeatures, setProductFeatures] = useState([
    { titleName: "", description: "" },
  ]);

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...productFeatures];
    updatedFeatures[index][key] = value;
    setProductFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setProductFeatures([
      ...productFeatures,
      { titleName: "", description: "" },
    ]);
  };

  const removeFeature = (index) => {
    const updatedFeatures = productFeatures.filter((_, i) => i !== index);
    setProductFeatures(updatedFeatures);
  };

  const handleSubmit = async () => {
    try {
      const payload = productFeatures.map((feature) => ({
        productId: productId,
        titleName: feature.titleName,
        description: feature.description,
      }));

      // Her özelliği ayrı ayrı eklemek için Promise.all
      await Promise.all(
        payload.map((item) => addProductFeatures(item).unwrap())
      );
      refetch();
      onclose();
    } catch (err) {
      console.error("Ekleme hatası:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg space-y-4">
        <label className="text-xl font-bold block">Ürün Özellikleri</label>

        {productFeatures.map((feature, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Başlık"
              value={feature.titleName}
              onChange={(e) =>
                handleFeatureChange(index, "titleName", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Açıklama"
              value={feature.description}
              onChange={(e) =>
                handleFeatureChange(index, "description", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => removeFeature(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={addFeature}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Özellik Ekle
        </button>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onclose} className="bg-gray-400 px-4 py-2 rounded">
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProductFeaturesAddModal;

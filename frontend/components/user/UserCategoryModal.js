"use client";

import React, { useEffect, useState } from "react";
import Loader from "../design/Loader";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useLazyGetCategorytByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/slices/categorySlice";
import {
  IoAddOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
} from "react-icons/io5";

const UserCategoryModal = ({ onClose }) => {
  const { data: Categories, isLoading, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [isUpdate, setIsUpdate] = useState(null);
  const [isAddCat, setIsAddCat] = useState(false);

  const [newName, setNewName] = useState("");

  const handleDelete = async (CategoryId) => {
    try {
      await deleteCategory({ CategoryId }).unwrap();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const handleUpdate = async (item) => {
    try {
      const updatedCategory = {
        CategoryId: item.id,
        categoryName: newName,
      };
      await updateCategory(updatedCategory).unwrap();
      setIsUpdate(null);
      setNewName("");
      refetch();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };
  const handleAddCat = async (item) => {
    try {
      const newCategory = {
        categoryName: newName,
      };
      await addCategory(newCategory).unwrap();
      setNewName("");
      setIsAddCat(false);

      refetch();
    } catch (err) {
      console.error("ekleme hatası:", err);
    }
  };
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="userModal_container">
      <div className="userModal_content">
        <button onClick={onClose} className="closeButton">
          Close
        </button>
        <div className="userModal_item_edit_1 userModal_item">
          <div className="userModal_item">
            <h2 className="userModal_title">Categories</h2>
          </div>

          <div className="catModalText">
            <button
              className="see_item_allButton"
              title="add category"
              onClick={() => {
                setIsAddCat(true);
              }}
            >
              <IoAddOutline />
            </button>
            {isAddCat && (
              <div className="userModal_item_edit">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Yeni kategori adı"
                  className="input_modal"
                />
                <button onClick={handleAddCat} className="see_item_allButton">
                  <IoCheckmarkOutline />
                </button>
                <button
                  onClick={() => {
                    setIsAddCat(false);
                    setNewName("");
                  }}
                  className="see_item_allButton"
                >
                  <IoCloseOutline />
                </button>
              </div>
            )}
          </div>
        </div>
        {Categories?.categories.map((item) => (
          <div key={item.id}>
            <div className="catModalText prose prose-sm space-y-4">
              <div className="userModal_item" title="Email">
                {item.categoryName}
              </div>
              <button
                className="user_item_allButton"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
              <button
                className="user_item_allButton"
                onClick={() => {
                  setIsUpdate(item.id);
                  setNewName(item.categoryName);
                }}
              >
                update
              </button>
              {isUpdate === item.id && (
                <div className="userModal_item_edit">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Yeni kategori adı"
                    className="input_modal"
                  />
                  <button
                    onClick={() => handleUpdate(item)}
                    className="see_item_allButton"
                  >
                    <IoCheckmarkOutline />
                  </button>
                  <button
                    onClick={() => setIsUpdate(null)}
                    className="see_item_allButton"
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategoryModal;

"use client";

import {
  useDeleteSubscribeMailMutation,
  useGetSubscribeMailQuery,
} from "@/redux/slices/subscribeMail";
import React from "react";
import Loader from "../design/Loader";

const SubscribeFormModal = ({ onClose }) => {
  const { data: SubFormData, isLoading, refetch } = useGetSubscribeMailQuery();
  const [deleteSubMail] = useDeleteSubscribeMailMutation();

  const handleDelete = async (SubscribeMailId) => {
    try {
      await deleteSubMail({ SubscribeMailId }).unwrap();
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
            Subscribe E-mail ({SubFormData?.totalSubscribeMailCount})
          </h2>
        </div>
        {SubFormData?.subscribeMails.map((item) => (
          <div key={item.id}>
            <div className="catModalText prose prose-sm space-y-4">
              <div className="userModal_item" title="Email">
                {item.email}
              </div>
              <button
                className="user_item_allButton"
                onClick={() => handleDelete(item.id)}
              >
                Delete{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribeFormModal;

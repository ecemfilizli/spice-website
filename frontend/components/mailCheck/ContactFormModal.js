"use client";
import {
  useGetContactQuery,
  useDeleteContactMutation,
} from "@/redux/slices/contactSlice";
import React from "react";
import Loader from "../design/Loader";

const ContactFormModal = ({ onClose }) => {
  const { data: contactFormData, isLoading, refetch } = useGetContactQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (ContactFormId) => {
    try {
      await deleteContact({ ContactFormId }).unwrap();
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
        {contactFormData?.contactForms.map((item) => (
          <div key={item.id}>
            <div className="userModal_item">
              <h2 className="userModal_title">{item.title}</h2>
            </div>
            <div className="mailModalText prose prose-sm space-y-4">
              <div className="userModal_item" title="First Name">
                {item.firstName}
              </div>
              <div className="userModal_item" title="Last Name">
                {item.lastName}
              </div>
              <div className="userModal_item" title="Company">
                {item.company}
              </div>
              <div className="userModal_item" title="City">
                {item.city}
              </div>
              <div className="userModal_item" title="Country">
                {item.country}
              </div>
              <div className="userModal_item" title="Phone Number">
                {item.phone}
              </div>
              <div className="userModal_item" title="Email">
                {item.email}
              </div>
              <div
                className="userModal_item"
                title="Preferred Method of Contact"
              >
                {item.preferredMethodOfContact}
              </div>
              <div className="userModal_item" title="Message">
                {item.message}
              </div>
              <button
                className="user_item_allButton"
                onClick={() => handleDelete(item.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFormModal;

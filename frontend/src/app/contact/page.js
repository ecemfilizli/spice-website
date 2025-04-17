"use client";

import { useAddContactMutation } from "@/redux/slices/contactSlice";
import Image from "next/image";
import React, { useState } from "react";
import PopupModal from "../../../components/modals/PopupModal";
import { IoCallOutline, IoLocation, IoMailOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("../../../components/design/Map"), {
  ssr: false,
});
const Contact = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    company: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    preferredMethodOfContact: "",
    message: "",
  });

  const [addContact, { isLoading }] = useAddContactMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState({ isOpen: false, message: "", color: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addContact(formData).unwrap();
      setModal({
        isOpen: true,
        message: "İletmek istediginiz mesaj başarılı bir şekilde bize ulaştı.",
        color: "green",
      });

      setTimeout(() => {
        setModal({ isOpen: false, message: "", color: "" });
      }, 3000);
      setErrorMessage("");
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        company: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        preferredMethodOfContact: "",
        message: "",
      });
    } catch (error) {
      console.error("Hata:", error);
      setModal({
        isOpen: true,
        message: "Bir hata oluştu. Lütfen bilgileri kontrol edin.",
        color: "red",
      });

      setTimeout(() => {
        setModal({ isOpen: false, message: "", color: "" });
      }, 3000);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <div className="contact_form_container">
        <h2 className="contact_form_title">Contact us</h2>
        <div className="contact_item_1">
          <div className="contact_container">
            <div className="contactInfo">
              <div className="contactInfo_title group relative">
                <div className="contactInfo_ico">
                  <IoCallOutline />
                </div>
                <span className="contactInfo_span">Phone Number</span>
              </div>
              <div className="contactInfo_info">
                <p>+905550550505</p>
                <p>+905550550505</p>
              </div>
            </div>
            <div className="contactInfo">
              <div className="contactInfo_title group relative">
                <div className="contactInfo_ico">
                  <IoMailOutline />
                </div>
                <span className="contactInfo_span">Email</span>
              </div>
              <div className="contactInfo_info">perdist_co@perdist.com.tr</div>
            </div>
            <div className="contactInfo">
              <div className="contactInfo_title group relative">
                <div className="contactInfo_ico">
                  <IoLocation />
                </div>
                <span className="contactInfo_span">Location</span>
              </div>
              <div className="contactInfo_info">
                <p>Adalet, Manas Blv. Side Road No:47, 35530 Bayraklı/İzmir</p>

                <div className="map_container">
                  <LeafletMap />
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="contact_form">
            {[
              { name: "title", label: "subject", type: "text" },
              { name: "firstName", label: "Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "company", label: "company", type: "text" },
              { name: "city", label: "city", type: "text" },
              { name: "country", label: "country", type: "text" },
              { name: "phone", label: "phone number", type: "number" },
              { name: "email", label: "Email", type: "email" },
              {
                name: "preferredMethodOfContact",
                label: "Method of Contact",
              },
            ].map((field) => (
              <div key={field.name} className="contact_form_item">
                <label className="contact_form_item_title">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="contact_form_item_info"
                />
              </div>
            ))}

            <div className="contact_form_item">
              <label className="contact_form_item_title ">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="contact_form_item_info"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="see_item_allButton"
            >
              SUBMİT
            </button>
          </form>
        </div>
        {successMessage && (
          <div className="contact_form_suc_message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="contact_form_error_message">{errorMessage}</div>
        )}

        <div className="contact_cricle_green ">
          <div className="fIcon_svg">
            <Image
              src="/design/circle_svg.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        {modal.isOpen && (
          <PopupModal
            message={modal.message}
            color={modal.color}
            closeModal={() =>
              setModal({ isOpen: false, message: "", color: "" })
            }
          />
        )}
      </div>
      <div className="contact_bg_green "></div>
    </div>
  );
};

export default Contact;

// <Image src="/design/background1.png" alt="" fill objectFit="fill" />

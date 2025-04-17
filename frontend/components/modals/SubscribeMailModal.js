"use client";
import React, { useState } from "react";
import { useAddSubscribeMailMutation } from "@/redux/slices/subscribeMail";
import { IoThumbsUpOutline } from "react-icons/io5";
import allowedEmailDomains from "../../utils/emailDomains";
import PopupModal from "./PopupModal";

const SubscribeMailModal = ({ onClose, isModal = true }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [addSubscribeMail, { isLoading }] = useAddSubscribeMailMutation();
  const [modal, setModal] = useState({ isOpen: false, message: "", color: "" });

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue)) {
      setMessages([
        { sender: "system", text: "Geçerli bir mail adresi girin." },
      ]);
      return;
    }

    const domain = inputValue.split("@")[1].toLowerCase();

    if (!allowedEmailDomains.includes(domain)) {
      // setMessages([
      //   {
      //     sender: "system",
      //     text: `Sadece yaygın e-posta adresleri kabul ediliyor. (gmail, outlook, yahoo vs.)`,
      //   },
      // ]);
      setModal({
        isOpen: true,
        message:
          "Sadece yaygın e-posta adresleri kabul ediliyor. (gmail, outlook, yahoo vs.)",
        color: "red",
      });

      setTimeout(() => {
        setModal({ isOpen: false, message: "", color: "" });
      }, 3000);
      return;
    }

    const userMessage = { sender: "user", text: inputValue };
    setMessages([userMessage]);

    try {
      const response = await addSubscribeMail({ email: inputValue }).unwrap();

      // const systemMessage = {
      //   sender: "system",
      //   text:
      //     response?.message ||
      //     "Mail adresi alındı! Yeni ürünler için mail kutunuzu kontrol edin.",
      // };
      setModal({
        isOpen: true,
        message: "İletmek istediginiz mesaj başarılı bir şekilde bize ulaştı.",
        color: "green",
      });

      // setMessages((prev) => [...prev, systemMessage]);
      setTimeout(() => {
        if (onClose) onClose();
        setModal({ isOpen: false, message: "", color: "" });
      }, 2000);
    } catch (error) {
      // const errorMsg = {
      //   sender: "system",
      //   text: "Bir hata oluştu. Lütfen tekrar deneyin.",
      // };

      setModal({
        isOpen: true,
        message: "Bir hata oluştu. Lütfen bilgileri kontrol edin.",
        color: "red",
      });

      setTimeout(() => {
        setModal({ isOpen: false, message: "", color: "" });
      }, 3000);
      // setMessages([errorMsg]);
    }

    setInputValue("");
  };
  return (
    <div>
      <div className={isModal ? "modal_1 modal-overlay" : ""}>
        <div className={isModal ? "modal_2" : ""}>
          {isModal && (
            <div className="modal_header">
              <h2 className="text-lg font-semibold">Subscribe !</h2>
              <button onClick={onClose} className="text-gray-500 text-xl">
                ×
              </button>
            </div>
          )}

          <div className="modal_info">
            <div>
              <label htmlFor="subInput">Email:</label>
              <input
                type="email"
                id="subInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder=""
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                required
                className="subInput"
              />
            </div>
            {isModal && (
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="check_allButton"
              >
                <IoThumbsUpOutline />
              </button>
            )}
          </div>
        </div>
      </div>
      {modal.isOpen && (
        <PopupModal
          message={modal.message}
          color={modal.color}
          closeModal={() => setModal({ isOpen: false, message: "", color: "" })}
        />
      )}
    </div>
  );
};

export default SubscribeMailModal;

// {isModal && (
//   <div className="modal_error">
//     {messages.map((msg, idx) => (
//       <div
//         key={idx}
//         className={`p-2 rounded-lg max-w-[70%] ${
//           msg.sender === "user" ? "modal_error_1" : "modal_error_2"
//         }`}
//       >
//         {msg.text}
//       </div>
//     ))}
//   </div>
// )}

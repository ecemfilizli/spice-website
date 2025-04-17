"use client";

import React, { useState } from "react";
import Image from "next/image";
import SubscribeMailModal from "../modals/SubscribeMailModal";
import { IoNotificationsCircle } from "react-icons/io5";

const FixedButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixedButton_container">
        <div
          className="fixedButtonMessage"
          onClick={() => setIsModalOpen(true)}
        >
          <IoNotificationsCircle alt="Chat" className="fixedButton_ico" />
        </div>
        <div className="fixedButtonWp">
          <Image
            src="/design/ic_wp.svg"
            alt="WhatsApp"
            width={40}
            height={40}
          />
        </div>
      </div>

      {isModalOpen && (
        <SubscribeMailModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default FixedButton;

import React from "react";

const PopupModal = ({ closeModal, message, color }) => {
  return (
    <div className=" popup_modal_container ">
      <div
        id="alert-border-3"
        className={`popup_modal_item text-${color}-800  border-${color}-300  `}
        role="alert"
      >
        <svg
          className="popup_modal_ico"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="popup_modal_info">{message}</div>
      </div>
    </div>
  );
};

export default PopupModal;

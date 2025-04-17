import React from "react";

const FooterModal = ({ text, onClose }) => {
  return (
    <div className="footerModal_container">
      <div className="footerModal_content">
        <button onClick={onClose} className="closeButton">
          Close
        </button>
        <div className="footerModalText prose prose-sm">{text}</div>
      </div>
    </div>
  );
};

export default FooterModal;

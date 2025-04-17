// components/ScrollTopButton.jsx
"use client";
import React, { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="scrollTopButton"
        aria-label="Yukarı çık"
      >
        <IoArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollTopButton;

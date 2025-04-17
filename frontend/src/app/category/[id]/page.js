"use client";

import React, { useEffect, useState } from "react";

import List from "../../../../components/category/List";
import Grid from "../../../../components/category/Grid";

const Category = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div className="products_container">{isDesktop ? <List /> : <Grid />}</div>
  );
};

export default Category;

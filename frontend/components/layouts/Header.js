// "use client";

// import { useGetProductsQuery } from "@/redux/slices/productSlice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { IoCaretForward, IoCaretUp } from "react-icons/io5";
// import { useGetCategoriesQuery } from "@/redux/slices/categorySlice";

// const Header = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   const menuRef = useRef(null);
//   const router = useRouter();
//   const { data } = useGetProductsQuery();
//   const { data: dataCategory } = useGetCategoriesQuery();

//   useEffect(() => {
//     if (showMenu) {
//       gsap.fromTo(
//         menuRef.current,
//         { opacity: 0, y: -10 },
//         { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
//       );
//     }
//   }, [showMenu]);

//   useEffect(() => {
//     const handleRouteChange = () => setShowMenu(false);
//     router.prefetch && handleRouteChange();
//   }, [router]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCategoryClick = (id) => {
//     router.push(`/category/${id}`);
//     setShowMenu(false);
//   };

//   return (
//     <div className="header_container relative">
//       <div>logo</div>

//       <div className="nav_container flex gap-4 items-center">
//         <Link href="/" className="nav_item">
//           home
//         </Link>
//         <button
//           className="nav_item"
//           onClick={() => setShowMenu((prev) => !prev)}
//         >
//           products
//         </button>
//         <Link href="/contact" className="nav_item">
//           contact
//         </Link>
//       </div>

//       {showMenu && (
//         <div ref={menuRef} className="header_menu_full">
//           <div className=" header_menu_category">
//             {dataCategory?.categories.map((categoryItem) => (
//               <div
//                 key={categoryItem.id}
//                 onMouseEnter={() =>
//                   setHoveredCategory(categoryItem.categoryName)
//                 }
//                 onMouseLeave={() => setHoveredCategory(null)}
//               >
//                 <div
//                   className="category_item_title "
//                   onClick={() => handleCategoryClick(categoryItem.categoryName)}
//                 >
//                   {categoryItem.categoryName}
//                 </div>

//                 {hoveredCategory === categoryItem.categoryName && (
//                   <div className="category_item_info ">
//                     {data?.products
//                       ?.find((cat) => cat.category === hoveredCategory)
//                       ?.products.map((product) => (
//                         <div
//                           key={product.id}
//                           className="category_item_info_1"
//                           onClick={() => (
//                             setShowMenu(false),
//                             router.push(
//                               `/products/${product.productName}?id=${product.id}`
//                             )
//                           )}
//                         >
//                           {product.productName}
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <Link
//             href="/products"
//             className="category_item_allButton"
//             onClick={() => setShowMenu(false)}
//           >
//             <span>see all </span>
//             <IoCaretForward />
//           </Link>
//           <div
//             className="category_item_closeButton"
//             onClick={() => setShowMenu(false)}
//           >
//             <IoCaretUp />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

// Header.js
"use client";

import { useGetProductsQuery } from "@/redux/slices/productSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IoCaretForward, IoCaretUp } from "react-icons/io5";
import { useGetCategoriesQuery } from "@/redux/slices/categorySlice";
import Image from "next/image";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const menuRef = useRef(null);
  const router = useRouter();
  const { data } = useGetProductsQuery();
  const { data: dataCategory } = useGetCategoriesQuery();

  useEffect(() => {
    if (showMenu) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showMenu]);

  useEffect(() => {
    const handleRouteChange = () => setShowMenu(false);
    router.prefetch && handleRouteChange();
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (id) => {
    router.push(`/category/${id}`);
    setShowMenu(false);
  };

  const handleCategoryHover = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  return (
    <div className="header_container relative">
      <Link href="/" className="header_logo">
        <Image
          src="/design/logo.svg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="nav_container flex gap-4 items-center">
        <Link href="/" className="nav_item">
          home
        </Link>
        <button
          className="nav_item"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          products
        </button>
        <Link href="/contact" className="nav_item">
          contact
        </Link>
      </div>

      {showMenu && (
        <div ref={menuRef} className="header_menu_full">
          <div className="header_menu_category">
            {dataCategory?.categories.map((categoryItem) => (
              <div
                key={categoryItem.id}
                className="category_parent"
                onMouseEnter={() =>
                  handleCategoryHover(categoryItem.categoryName)
                }
              >
                <div
                  className="category_item_title"
                  onClick={() => handleCategoryClick(categoryItem.categoryName)}
                >
                  {categoryItem.categoryName}
                </div>
              </div>
            ))}
          </div>

          {/* Tam genişlikte alt menü */}
          {hoveredCategory && (
            <div
              className="full_width_submenu"
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="submenu_content">
                <h3 className="submenu_title">{hoveredCategory}</h3>
                <div className="submenu_grid">
                  {data?.products
                    ?.find((cat) => cat.category === hoveredCategory)
                    ?.products.map((product) => (
                      <div
                        key={product.id}
                        className="submenu_item"
                        onClick={() => {
                          setShowMenu(false);
                          router.push(
                            `/products/${product.productName}?id=${product.id}`
                          );
                        }}
                      >
                        {product.productName}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <Link
            href="/products"
            className="category_item_allButton"
            onClick={() => setShowMenu(false)}
          >
            <span>see all </span>
            <IoCaretForward />
          </Link>
          <div
            className="category_item_closeButton"
            onClick={() => setShowMenu(false)}
          >
            <IoCaretUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

import { useGetCategoriesQuery } from "@/redux/slices/categorySlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  IoCallOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoMailOutline,
} from "react-icons/io5";
import SubscribeMailModal from "../modals/SubscribeMailModal";
import FooterModal from "../modals/FooterModal";
import privacyText from "@/content/privacyText";
import cookies from "@/content/cookies";

const Footer = () => {
  const router = useRouter();
  const { data: data } = useGetCategoriesQuery();

  const [isShow, setIsShow] = useState(false);
  const [isShowCookie, setIsShowCookie] = useState(false);

  const handleCategoryClick = (id) => {
    router.push(`/category/${id}`);
  };

  const handleClick = () => {
    setIsShow(true);
  };
  const handleCookieClick = () => {
    setIsShowCookie(true);
  };
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="fInfo_container_1">
          <Link className="fInfo_container_1_item" href="/">
            Home
          </Link>
          <div className="fInfo_container_1_item_li">
            <Link className="fInfo_container_1_item" href="/products">
              Products
            </Link>
            <div className="fInfo_container_1_item_li_2">
              {data?.categories.map((item) => (
                <div key={item.id} className="fInfo_container_1_item">
                  <div onClick={() => handleCategoryClick(item.categoryName)}>
                    {item.categoryName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link className="fInfo_container_1_item" href="/contact">
            contact
          </Link>
        </div>

        <div className="fInfo_container_2">
          <div className="fInfo">
            <div className="fInfo_title group relative">
              <div className="fIcon">
                <IoCallOutline />
              </div>
              <span className="fSpan">phone number</span>
            </div>
            <div className="fInfo_info">+905550550505</div>
            <div className="fInfo_info">+905550550505</div>
          </div>

          <div className="fInfo">
            <div className="fInfo_title group relative">
              <div className="fIcon">
                <IoLogoInstagram />
              </div>
              <span className="fSpan">Instagram</span>
            </div>
            <div className="fInfo_info">perdist_co</div>
          </div>
          <div className="fInfo">
            <div className="fInfo_title group relative">
              <div className="fIcon">
                <IoMailOutline />
              </div>
              <span className="fSpan">email</span>
            </div>
            <div className="fInfo_info">perdist_co@perdist.com.tr</div>
          </div>
        </div>
      </div>

      <div className="fInfo_container_image_max">
        <div className="fInfo_container_image">
          <Image
            src="/design/footer1.png"
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="fInfo_container_image_info">
          <p className="fInfo_container_image_info_1">e-bulletin</p>
          <div className="fInfo_container_image_info">
            <SubscribeMailModal isModal={false} />
          </div>
        </div>
      </div>

      <div className="fInfo_container_max">
        <div className="fInfo_container_max_info">
          {" "}
          COPYRİGHT &copy; 2025 PERDIST
        </div>
        <div className="fInfo_container_max_info">
          <div onClick={handleClick} className="fInfo_container_max_info_item">
            Terms & Conditions
          </div>
          <div
            onClick={handleCookieClick}
            className="fInfo_container_max_info_item"
          >
            Cookies
          </div>
        </div>
      </div>
      {isShow && (
        <FooterModal text={privacyText} onClose={() => setIsShow(false)} />
      )}
      {isShowCookie && (
        <FooterModal text={cookies} onClose={() => setIsShowCookie(false)} />
      )}
    </div>
  );
};

export default Footer;

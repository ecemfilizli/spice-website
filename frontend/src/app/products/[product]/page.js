"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/slices/productSlice";
import Image from "next/image";
import { IoChevronBackCircleOutline, IoMailOutline } from "react-icons/io5";
import ProductContactForm from "../../../../components/productDesign/ProductContactForm";
import Loader from "../../../../components/design/Loader";

const Product = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const productName = params.product;
  const id = searchParams.get("id");
  const router = useRouter();
  console.log("params:", params);
  console.log("id:", id);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/";

  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log("data:", data);

  useEffect(() => {
    if (data?.productImageFiles?.length > 0 && !selectedImage) {
      setSelectedImage(apiUrl + data.productImageFiles[0].path);
    }
  }, [data]);
  const handleClickPrev = () => {
    router.back();
  };

  const handleClickProductContactForm = () => setShowModal(true);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <p>Hata: {error.message}</p>;
  return (
    <div>
      <div className="product_item_container">
        <p className="product_item_1">
          <strong>{data?.productName}</strong>
        </p>
        <div className="product_item_2">
          <div className="product_item_images">
            {selectedImage && (
              <div className="product_item_images_container">
                <Image
                  src={selectedImage}
                  alt="Seçili Ürün Fotoğrafı"
                  fill
                  className="object-contain rounded-lg border"
                />
              </div>
            )}

            <div className="product_thumbnail_container ">
              {data?.productImageFiles?.map((item) => {
                const fullPath = apiUrl + item.path;
                const isSelected = selectedImage === fullPath;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(fullPath)}
                    className={`product_thumbnail_item
                  ${
                    isSelected
                      ? "product_thumbnail_item_active"
                      : "product_thumbnail_item_inactive"
                  } `}
                  >
                    <Image
                      src={fullPath}
                      alt="Ürün Küçük Resim"
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="product_item_images_desc">{data?.description}</p>
          </div>
        </div>

        <p className="product_item_features_title">features:</p>
        <div className="product_item_3">
          {data?.productFeatures?.map((item) => (
            <div key={item.id} className="product_item_features_container">
              <p className="product_item_features">
                <strong> {item.titleName}</strong>
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="product_item_4" onClick={handleClickPrev}>
        <IoChevronBackCircleOutline className="fIcon" />
      </button>

      <button
        className="product_item_5"
        onClick={handleClickProductContactForm}
      >
        <IoMailOutline className="fIcon" />
      </button>
      {showModal && (
        <ProductContactForm id={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Product;
// {data?.productImageFiles?.map((item) => (
//   <div key={item.id} className="product_item_images_container">
//     <Image src={apiUrl + `${item.path}`} alt="" fill className="img1" />
//   </div>
// ))}

"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

const Slider = () => {
  const router = useRouter();

  useEffect(() => {
    let nextDom = document.getElementById("next");
    let prevDom = document.getElementById("prev");
    let carouselItemDom = document.querySelector(".carousel");
    let listItemDom = document.querySelector(".carousel .list");
    let thumbnailItemDom = document.querySelector(".carousel .thumbnail");

    nextDom.onclick = function () {
      showSlider("next");
    };
    prevDom.onclick = function () {
      showSlider("prev");
    };

    let timeRuning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runAutoRun = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
      let itemSlider = document.querySelectorAll(".carousel .list .item");
      let itemThumbnail = document.querySelectorAll(
        ".carousel .thumbnail .item"
      );

      if (!itemSlider.length || !itemThumbnail.length) return; // güvenlik önlemi

      if (type === "next") {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailItemDom.appendChild(itemThumbnail[0]);
        carouselItemDom.classList.add("next");
      } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailItemDom.prepend(itemThumbnail[positionLastItem]);
        carouselItemDom.classList.add("prev");
      }
      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselItemDom.classList.remove("next");
        carouselItemDom.classList.remove("prev");
      }, timeRuning);

      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    }
  }, []);
  const handleCategoryClick = (topic) => {
    router.push(`/category/${topic}`);
  };

  return (
    <div className="carousel">
      <div className="list">
        <div className="item">
          <div className="sliderImage">
            <Image
              src="/slider/slider3.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <div className="author">perdist</div>
            <div className="title">Versatile Starches for Every Need</div>
            <div className="topic">starch</div>
            <div className="desc">
              `&#34;`From corn to pea, discover our wide starch
              portfolio.`&#34;`
            </div>
            <div className="buttons">
              <button onClick={() => handleCategoryClick("starch")}>
                see more
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="item">
          <div className="sliderImage">
            <Image
              src="/slider/slider1.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <div className="author">perdist</div>
            <div className="title">Spice Up Your World</div>
            <div className="topic">spice</div>
            <div className="desc">
              `&#34;` Discover the finest blends of flavor and aroma.`&#34;`
            </div>
            <div className=" buttons">
              <button onClick={() => handleCategoryClick("spice")}>
                see more
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="sliderImage">
            <Image
              src="/slider/slider2.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <div className="author">perdist</div>
            <div className="title">Sustainable Fiber Solutions</div>
            <div className="topic">Fiber</div>
            <div className="desc">
              `&#34;`Eco-friendly, functional fibers for every
              application.`&#34;`
            </div>
            <div className=" buttons">
              <button onClick={() => handleCategoryClick("fiber")}>
                see more
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="item">
          <div className="sliderImage">
            <Image
              src="/slider/slider4.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <div className="author">perdist</div>
            <div className="title">Nature’s Protein, Powered by Plants</div>
            <div className="topic">protein</div>
            <div className="desc">
              `&#34;`Sustainable, allergen-friendly and versatile protein
              sources.`&#34;`
            </div>
            <div className=" buttons">
              <button onClick={() => handleCategoryClick("protein")}>
                see more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="thumbnail">
        <div className="item">
          <div className="thumbnailImage">
            <Image
              src="/slider/slider1.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <button onClick={() => handleCategoryClick("spice")}>
              <div className="title">spice</div>
            </button>{" "}
          </div>
        </div>
        <div className="item">
          <div className="thumbnailImage">
            <Image
              src="/slider/slider2.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <button onClick={() => handleCategoryClick("fiber")}>
              <div className="title">fiber</div>
            </button>
          </div>
        </div>

        <div className="item">
          <div className="thumbnailImage">
            <Image
              src="/slider/slider4.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <div className="title">
              <button onClick={() => handleCategoryClick("protein")}>
                protein
              </button>{" "}
            </div>
          </div>
        </div>
        <div className="item">
          <div className="thumbnailImage">
            <Image
              src="/slider/slider3.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <button onClick={() => handleCategoryClick("starch")}>
              <div className="title">starch</div>
            </button>
          </div>
        </div>
      </div>
      <div className="arrows">
        <button id="prev">
          <IoArrowBackCircleOutline className="ico" />
        </button>
        <button id="next">
          <IoArrowForwardCircleOutline className="ico" />
        </button>
      </div>
      <div className="time"></div>
    </div>
  );
};

export default Slider;

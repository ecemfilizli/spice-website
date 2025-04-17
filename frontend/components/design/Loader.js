"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Loader = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const path = svgRef.current.querySelector("path");
    const pathLength = path.getTotalLength();
    const timeline = gsap.timeline({ repeat: -1 });

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
    timeline
      .to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
      })
      .to(
        svgRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.5"
      );
  }, []);
  return (
    <div className="loaderContainer">
      <div className="loadgif">
        <div className="svg_container">
          <svg
            ref={svgRef}
            className="svg "
            width="207"
            height="188"
            viewBox="0 0 207 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.501 159.5C74.501 159.5 96.0009 184.5 103.001 184.5C110.001 184.5 131.501 159.5 131.501 159.5M172.001 144.5C172.001 144.5 206.019 118.021 187.115 100M186.001 99C166.501 82.5 145.001 118.5 145.001 118.5M186.001 99C186.391 99.3303 186.762 99.6637 187.115 100M186.001 99L187.115 100M158.501 131.5C158.501 131.5 242.493 58.2086 182.001 15C115.501 -32.5 63.0011 81.2273 103.001 83.5C143.001 85.7728 110.931 1.1416 46.0006 4.50003C-11.9996 7.5 1.00004 83.5 19.4999 96.5C19.4999 96.5 1.4452 113.445 22 134C57 169 75.5 118.5 55 106.5"
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;

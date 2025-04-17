// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import DesignButton from "../fixed/DesignButton";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// const About = () => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     if (!svgRef.current) return;
//     const path = svgRef.current.querySelector("path");
//     const pathLength = path.getTotalLength();
//     const timeline = gsap.timeline();

//     gsap.set(path, { strokeDasharray: pathLength });

//     timeline
//       .fromTo(
//         path,
//         { strokeDashoffset: pathLength },
//         {
//           strokeDashoffset: 0,
//           duration: 5,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".svg_container",
//             start: "top 60%",
//             end: "bottom bottom",
//             scrub: 5,
//           },
//         }
//       )
//       .fromTo(
//         ".about_title",
//         {
//           opacity: 0,
//           y: -20,
//         },
//         {
//           opacity: 1,
//           y: 1,
//           duration: 5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".about_title",
//             start: "top 80%",
//             end: "bottom bottom",
//             scrub: 3,
//           },
//         }
//       )
//       .fromTo(
//         ".text-1_container",
//         {
//           opacity: 0,
//           y: -20,
//         },
//         {
//           opacity: 1,
//           y: 1,
//           duration: 10,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-1_container",
//             start: "top 70%",
//             end: "bottom bottom",
//             scrub: 3,
//           },
//         },
//         0
//       )
//       .fromTo(
//         ".text-2_container",
//         {
//           opacity: 0,
//           x: -100,
//         },
//         {
//           opacity: 1,
//           x: 1,
//           duration: 10,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-2_container",
//             start: "top 80%",
//             end: "bottom bottom",
//             scrub: 3,
//           },
//         }
//       )
//       .fromTo(
//         ".text-3_container",
//         {
//           opacity: 0,
//           x: 100,
//         },
//         {
//           opacity: 1,
//           x: 1,
//           duration: 10,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-3_container",
//             start: "top 80%",
//             end: "bottom bottom",
//             scrub: 3,
//           },
//         },
//         0
//       )
//       .fromTo(
//         ".text-4_container, .text-4_container_image",
//         {
//           opacity: 0,
//           x: -100,
//         },
//         {
//           opacity: 1,
//           x: 1,
//           duration: 10,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-4_container, .text-4_container_image",
//             start: "top 90%",
//             end: "bottom bottom",
//             scrub: 4,
//           },
//         }
//       )
//       .fromTo(
//         ".text-5_container, .text-5_container_image",
//         {
//           opacity: 0,
//           x: 100,
//         },
//         {
//           opacity: 1,
//           x: 1,
//           duration: 10,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-5_container ,.text-5_container_image",
//             start: "top 90%",
//             end: "bottom bottom",
//             scrub: 4,
//           },
//         },
//         "+=5"
//       )
//       .fromTo(
//         ".text-6_container",
//         {
//           opacity: 0,
//           y: -20,
//         },
//         {
//           opacity: 1,
//           y: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".text-6_container",
//             start: "top %100",
//             end: "bottom bottom",
//             scrub: 4,
//           },
//         }
//       )
//       .fromTo(
//         ".running-line-wrapper",
//         {
//           opacity: 0,
//           y: -20,
//         },
//         {
//           opacity: 1,
//           y: 1,
//           duration: 5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".running-line-wrapper",
//             start: "top 90%",
//             end: "bottom bottom",
//             scrub: 3,
//           },
//         }
//       );
//   }, []);

//   return (
//     <div className="about_container">
//       <div className="about_title">
//         <h1>Biz Kimiz?</h1>
//       </div>
//       <div className="text-1_container">
//         Perdist, global pazarda çeşitli ülkelerden geniş bir ürün yelpazesi
//         ithal ederek müşterilerine yüksek kaliteli çözümler sunan lider bir
//         tedarikçidir. Müşteri odaklı yaklaşımımız ile gıda üretim sektöründeki
//         müşterilerimizin ihtiyaçlarını derinlemesine anlamakta ve bu ihtiyaçlara
//         uygun inovatif çözümler geliştirmekteyiz.
//       </div>
//       <div className="running-line-wrapper">
//         Perdist, gıda üretiminde kullanılan geniş bir ürün yelpazesi
//         sunmaktadır. İthal ettiğimiz ürün grupları şunlardır:
//       </div>
//       <div className="text-2_container">
//         <div className="text_title">Hammaddeler:</div>
//         <div className="text-info">
//           <div>
//             <span className="text_subtitle">Un, Şeker, Yağlar:</span>
//             <p>Farklı gıda ürünlerinin üretiminde temel hammaddeler.</p>
//           </div>
//           <div>
//             <span className="text_subtitle"> Tahıllar ve Baklagiller:</span>
//             <p>
//               Yüksek besin değeri sunan ve çeşitli ürünlerde kullanılan doğal
//               kaynaklar.
//             </p>
//           </div>
//           <div>
//             <span className="text_subtitle">Süt ve Süt Ürünleri:</span>
//             <p>
//               Peynir, yoğurt ve diğer süt bazlı ürünlerin üretiminde kullanılan
//               yüksek kaliteli süt ürünleri.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="text-3_container">
//         <div className="text_title">Katkı Maddeleri:</div>
//         <div className="text-info">
//           <div>
//             <span className="text_subtitle">Koruyucular:</span>
//             <p>
//               Gıda ürünlerinin raf ömrünü uzatan ve tazeliği koruyan doğal ve
//               sentetik koruyucu maddeler.
//             </p>
//           </div>
//           <div>
//             <span className="text_subtitle">Aromalar ve Renk Vericiler: </span>
//             <p>Ürünlerin tat ve görünümünü zenginleştiren katkı maddeleri.</p>
//           </div>
//           <div>
//             <span className="text_subtitle">Emülsifiye Ediciler:</span>
//             <p>
//               Yağ ve su gibi bileşenlerin homojen bir karışım oluşturmasını
//               sağlayan katkılar.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="text-4_container">
//         <div className="text_title2">Müşteri İlişkileri</div>
//         <div className="text-4">
//           <p>
//             Müşterilerimizle olan ilişkilerimizi, karşılıklı güven ve işbirliği
//             üzerine inşa ediyoruz. Her müşterimizin ihtiyaçlarını anlamak için
//             detaylı analizler yapıyor, özel çözümler sunuyoruz. Müşteri destek
//             ekibimiz, her aşamada yanınızda olup, sorularınıza hızlı ve etkili
//             yanıtlar vererek süreçlerinizi kolaylaştırmaktadır. Ayrıca,
//             sektördeki yenilikleri takip ederek müşterilerimize en güncel
//             bilgiler ve çözümler sunmaktayız.
//           </p>
//         </div>
//       </div>
//       <div className="text-5_container">
//         <div className="text_title2">Kalite ve Güvenilirlik</div>
//         <div className="text-5">
//           <p>
//             Kalitenin her şeyden önce geldiğine inanıyoruz. Tüm ürünlerimiz,
//             uluslararası standartlara uygunluk sağlamak amacıyla sıkı kalite
//             kontrol süreçlerinden geçmektedir. Sağladığımız ürünlerin
//             güvenilirliği, müşteri memnuniyetini artırmakta ve uzun vadeli iş
//             ilişkileri kurmamıza yardımcı olmaktadır. Ayrıca, ürünlerimizin
//             izlenebilirliği sayesinde, müşterilerimiz her zaman ne
//             kullandıklarını bilme güvenine sahiptir.
//           </p>
//         </div>
//       </div>
//       <div className="text-6_container">
//         <div className="text-6">
//           <p>
//             Perdist olarak, gıda üretim sektöründe yüksek kaliteli ürünler ve
//             çözümler sunma konusundaki kararlılığımızla, sektördeki
//             liderliğimizi sürdürmekteyiz. İhtiyaçlarınıza özel çözümler
//             geliştirmek ve iş süreçlerinizi optimize etmek için buradayız.
//             Bizimle iletişime geçin ve işinizi bir adım öteye taşıyacak çözüm
//             ortaklığını keşfedin! Müşteri memnuniyeti odaklı hizmet anlayışımız
//             ile birlikte, gıda üretiminde yeni bir standart belirlemeye hazırız.
//           </p>
//         </div>
//       </div>
//       <div className="text-4_container_image">
//         <Image src="/design/crm.png" alt="" fill objectFit="cover" />
//       </div>
//       <div className="text-5_container_image">
//         <Image src="/design/quality.png" alt="" fill objectFit="cover" />
//       </div>
//       <Link className="buton_container" href="/products">
//         <DesignButton desc={"ürün listesi için tıklayın"}></DesignButton>
//       </Link>
//       <div className="svg_container">
//         <svg
//           ref={svgRef}
//           className="svg "
//           width="1678"
//           height="2663"
//           viewBox="0 0 1678 2663"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M858 1C847.146 264 1130.98 289.5 1064.98 451.5C917.431 813.658 -52.7485 196.102 5.51973 850C59.8316 1459.5 1649.94 2288.5 1649.94 1348C1649.94 692.5 -4.22263 1191 48.9228 1881C91.9264 2439.33 1778.35 2069.74 1670.52 1947.5C1562.02 1824.5 1784.02 2712.5 1284.33 2495C699.17 2240.3 747.885 2620.7 792.331 2660.5"
//             stroke="black"
//             strokeWidth="5"
//           />
//         </svg>
//       </div>
//       <div className="about_image1">
//         <Image src="/design/image1.png" alt="" fill objectFit="cover" />
//       </div>
//       <div className="about_image2">
//         <Image src="/design/image1.png" alt="" fill objectFit="cover" />
//       </div>
//     </div>
//   );
// };

// export default About;

"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DesignButton from "../fixed/DesignButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const path = svgRef.current.querySelector("path");
    const pathLength = path.getTotalLength();
    const timeline = gsap.timeline();

    gsap.set(path, { strokeDasharray: pathLength });

    timeline
      .fromTo(
        path,
        { strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".svg_container",
            start: "top 60%",
            end: "bottom bottom",
            scrub: 5,
          },
        }
      )
      .fromTo(
        ".about_title",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 1,
          duration: 5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about_title",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 3,
          },
        }
      )
      .fromTo(
        ".text-1_container",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 1,
          duration: 10,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-1_container",
            start: "top 70%",
            end: "bottom bottom",
            scrub: 3,
          },
        },
        0
      )
      .fromTo(
        ".text-2_container",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 1,
          duration: 10,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-2_container",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 3,
          },
        }
      )
      .fromTo(
        ".text-3_container",
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 1,
          duration: 10,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-3_container",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 3,
          },
        },
        0
      )
      .fromTo(
        ".text-4_container, .text-4_container_image",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 1,
          duration: 10,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-4_container, .text-4_container_image",
            start: "top 90%",
            end: "bottom bottom",
            scrub: 4,
          },
        }
      )
      .fromTo(
        ".text-5_container, .text-5_container_image",
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 1,
          duration: 10,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-5_container ,.text-5_container_image",
            start: "top 90%",
            end: "bottom bottom",
            scrub: 4,
          },
        },
        "+=5"
      )
      .fromTo(
        ".text-6_container",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".text-6_container",
            start: "top %100",
            end: "bottom bottom",
            scrub: 4,
          },
        }
      )
      .fromTo(
        ".running-line-wrapper",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 1,
          duration: 5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".running-line-wrapper",
            start: "top 90%",
            end: "bottom bottom",
            scrub: 3,
          },
        }
      );
  }, []);

  return (
    <div className="about_container">
      <div className="about_title">
        <h1>Who Are We?</h1>
      </div>
      <div className="text-1_container">
        Perdist is a prominent global supplier, offering high-quality solutions
        by sourcing a diverse range of products from various countries. Through
        our customer-centric approach, we gain deep insight into the specific
        needs of our clients in the food production industry and deliver
        innovative, tailor-made solutions to meet those demands.
      </div>
      <div className="running-line-wrapper">
        Perdist offers a wide range of products used in food production. The
        product categories we import include:
      </div>
      <div className="text-2_container">
        <div className="text_title">Raw Materials:</div>
        <div className="text-info">
          <div>
            <span className="text_subtitle">Flour, Sugar, Oils:</span>
            <p>
              Core ingredients that serve as the foundation in the manufacturing
              of diverse food products.
            </p>
          </div>
          <div>
            <span className="text_subtitle"> Grains and Legumes:</span>
            <p>
              Nutrient-rich natural ingredients commonly utilized in a wide
              range of food applications.
            </p>
          </div>
          <div>
            <span className="text_subtitle">Dairy and Dairy Products:</span>
            <p>
              Premium dairy ingredients essential for manufacturing cheese,
              yogurt, and a variety of milk-based food products.
            </p>
          </div>
        </div>
      </div>
      <div className="text-3_container">
        <div className="text_title">Additives:</div>
        <div className="text-info">
          <div>
            <span className="text_subtitle">Preservatives:</span>
            <p>
              Substances, both natural and synthetic, used to prolong the shelf
              life and preserve the quality and freshness of food products.
            </p>
          </div>
          <div>
            <span className="text_subtitle">Flavorings and Colorants: </span>
            <p>
              Functional additives used to improve the sensory appeal of food
              products by enriching their taste and visual appearance.
            </p>
          </div>
          <div>
            <span className="text_subtitle">Emulsifiers:</span>
            <p>
              Substances that help create a uniform mixture of oil, water, and
              other ingredients, ensuring consistency in food products.
            </p>
          </div>
        </div>
      </div>
      <div className="text-4_container">
        <div className="text_title2">Customer Relations</div>
        <div className="text-4">
          <p>
            We build our relationships with our customers on mutual trust and
            collaboration. We conduct detailed analyses to understand the unique
            needs of each customer and provide tailored solutions. Our customer
            support team is with you at every stage, offering fast and effective
            responses to your questions, making your processes easier.
            Additionally, we keep up with industry innovations to provide our
            customers with the most up-to-date information and solutions.
          </p>
        </div>
      </div>
      <div className="text-5_container">
        <div className="text_title2">Quality and Reliability</div>
        <div className="text-5">
          <p>
            We believe that quality comes above all else. All of our products
            undergo rigorous quality control processes to ensure compliance with
            international standards. The reliability of the products we provide
            enhances customer satisfaction and helps us build long-term business
            relationships. Additionally, thanks to the traceability of our
            products, our customers always have the confidence of knowing
            exactly what they are using.
          </p>
        </div>
      </div>
      <div className="text-6_container">
        <div className="text-6">
          <p>
            At Perdist, we continue to maintain our leadership in the food
            production industry with our commitment to providing high-quality
            products and solutions. We are here to develop customized solutions
            for your needs and optimize your business processes. Contact us to
            discover a partnership that will take your business to the next
            level! With our customer satisfaction-focused service approach, we
            are ready to set a new standard in food production.
          </p>
        </div>
      </div>
      <div className="text-4_container_image">
        <Image
          src="/design/crm.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="text-5_container_image">
        <Image
          src="/design/quality.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <Link className="buton_container" href="/products">
        <DesignButton desc={"Click here for the product list"}></DesignButton>
      </Link>
      <div className="svg_container">
        <svg
          ref={svgRef}
          className="svg "
          width="1678"
          height="2663"
          viewBox="0 0 1678 2663"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M858 1C847.146 264 1130.98 289.5 1064.98 451.5C917.431 813.658 -52.7485 196.102 5.51973 850C59.8316 1459.5 1649.94 2288.5 1649.94 1348C1649.94 692.5 -4.22263 1191 48.9228 1881C91.9264 2439.33 1778.35 2069.74 1670.52 1947.5C1562.02 1824.5 1784.02 2712.5 1284.33 2495C699.17 2240.3 747.885 2620.7 792.331 2660.5"
            stroke="black"
            strokeWidth="5"
          />
        </svg>
      </div>
      <div className="about_image1">
        <Image
          src="/design/image1.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="about_image2">
        <Image
          src="/design/image1.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default About;

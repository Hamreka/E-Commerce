'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
    const settings = {
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:false,
    dots: true,
    infinite: true,

    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return (
        <div className="w-[98%] mt-5 mb-10 m-auto">
                <Slider  {...settings}>
      <div>
        <Image src='/images/mainslider1.png' alt="mainslider1" width={1500} height={200}/>
      </div>
  
      <div>
        <Image src='/images/mainslider2.png' alt="mainslider2" width={1500} height={200}/>
      </div>
  
      <div>
        <Image src='/images/mainslider3.png' alt="mainslider3" width={1500} height={200}/>
      </div>
  
      <div>
        <Image src='/images/mainslider4.png' alt="mainslider4" width={1500} height={200}/>
      </div>
  
    </Slider>
      </div>

  );
}
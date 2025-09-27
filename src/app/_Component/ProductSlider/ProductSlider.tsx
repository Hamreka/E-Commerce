'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({images}: {images:string[]}) {
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
      <Slider  {...settings}>
          {
              images.map((image) => {
                  return<div key={image}>
                        <Image src={image} alt="mainslider1" width={1500} height={200}/>
                    </div>
              })
          }
      
  
    </Slider>
  )
}

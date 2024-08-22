"use client";
import React from "react";
import { Carousel } from "antd";

interface BannerProps {
  banners: string[]; // 接受一个字符串数组作为 props
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay>
      {banners.map((banner, index) => (
        <div key={index}>
          <h3
            className="m-0 h-[500px] text-white leading-[500px] text-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          ></h3>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;

import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";

function AdvertiseSlide(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    cssEase: "linear",
  };
  return (
    <Fragment>
        <Container className="p-0" fluid id="ad_slide">
        <Slider {...settings}>
          <div>
            <img
              src="https://cdn.waterstones.com/images/00215563-1920x533.jpeg"
              alt="Ảnh quảng cáo"
            />
          </div>
          <div>
            <img
         
              src="https://cdn.waterstones.com/images/00216862-1920x533.jpeg"
              alt="Ảnh quảng cáo"
            />
          </div>
          <div>
            <img
         
              src="https://cdn.waterstones.com/images/00216858-1920x533.jpeg"
              alt="Ảnh quảng cáo"
            />
          </div>
        </Slider></Container>
    </Fragment>
  );
}
export default AdvertiseSlide;

import React, { Fragment, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import Arrow from "./Arrow";
import styles from "./Slick.module.css";
import { formatCurrencyVN } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ProductInfo } from "../Product/ProductInfo";

function SlickSlider(props) {
  let slide_to_show = props.slide_to_show == null ? 4 : props.slide_to_show;
  let slide_to_scroll =
    props.slide_to_scroll == null ? 4 : props.slide_to_scroll;
  let default_responsive_setting = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];
  let responsive_setting =
    props.responsive_setting === null
      ? default_responsive_setting
      : props.responsive_setting;
  let items = props.items;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: slide_to_show,
    slidesToScroll: slide_to_scroll,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <Arrow></Arrow>,
    prevArrow: <Arrow></Arrow>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [productHover, setProductHover] = useState(-1)
  const [sliderHover, setSliderHover] = useState(false)
  const slider = useRef(null);
  const navigate = useNavigate()

  const redirectDetailProduct = (id) => {
    window.scrollTo(0,0)
    navigate(`/book/${id}`)
  }

  return (
    <Fragment>
      <div className="p-2 container " 
          onMouseLeave={()=>setSliderHover(false)}
          onMouseEnter={()=>setSliderHover(true)}
      >
        {sliderHover &&   
          <>
            <button className={`btn ${styles.angleRightBtn} btn-danger`} onClick={() => slider?.current?.slickNext()}>
              <i className="fa fa-angle-right"></i>
            </button>
            <button className={`btn ${styles.angleLeftBtn}`} onClick={() => slider?.current?.slickPrev()}>
              <i className="fa fa-angle-left"></i>
            </button>
          </>
        }
        {(items && items?.length > 0 )&& (
          <Slider {...settings} ref={slider}>
            {items.map((item, index)=>{
              return (
                <div key={`itemSlider-${index}-${item.id}` }className="animate__animated " >
                  <ProductInfo book={item}/>
                </div>
              )
            })}
          </Slider>
        )}
      </div>
    </Fragment>
  );
}

export default SlickSlider;

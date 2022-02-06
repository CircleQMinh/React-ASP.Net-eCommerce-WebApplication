import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import Arrow from "./Arrow";

function SlickSlider(props) {
  let slide_to_show = props.slide_to_show === null ? 4 : props.slide_to_show;
  let slide_to_scroll =
    props.slide_to_scroll === null ? 4 : props.slide_to_scroll;
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
  let responsive_setting = props.responsive_setting === null ? default_responsive_setting : props.responsive_setting;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
  return (
    <Fragment>
      <Container className="p-3">
        <Slider {...settings}>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/200/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />

              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">Some quick example text.</p>
                <a href="/" className="btn btn-primary">
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/197/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />

              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">Some quick example text.</p>
                <a href="/" className="btn btn-primary">
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/198/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>

          <div>
            <div className="card">
              <img
                src="https://picsum.photos/199/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>

          <div>
            <div className="card">
              <img
                src="https://picsum.photos/204/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/203/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/202/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>
          <div>
            <div className="card">
              <img
                src="https://picsum.photos/201/200"
                className="card-img-top"
                alt="PRODUCT 1"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Some quick example text.</p>
              <a href="/" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>
        </Slider>{" "}
      </Container>
    </Fragment>
  );
}

export default SlickSlider;

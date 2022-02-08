import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import Arrow from "./Arrow";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

function SlickSliderRelatedProduct(props) {
  //console.log(props.items);
  const navigate = useNavigate()
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
    dots: true,
    infinite: items.length > slide_to_show,
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
  function onProductCardClick(id){
    window.scrollTo(0,0)
    navigate(`/book/${id}`)
  }
  return (
    <Fragment>
      <Container className="p-3">
        {items == null && (
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
          </Slider>
        )}
        {items != null && (
          <Slider {...settings}>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className="col  "  >
                    <div className="card border border-4 rounded-3 mb-2" onClick={()=>{onProductCardClick(item.id)}} id={item.id}>
                      <img
                        src={item.imgUrl}
                        className="card-img-top product_img"
                        alt={`Product ${item.id}`}
                      />
                      <div className="card-body">
                        <h5 className="card-title product_name">
                          {item.title}
                        </h5>
                      </div>
                      {/* Không có giảm giá */}
                      {item.promotionInfo == null && (
                        <div className="product_price_div">
                          <p className="text-center">
                            <NumberFormat
                              value={item.price}
                              className="text-center text-danger text-decoration-underline  "
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"đ"}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </p>
                        </div>
                      )}
                      {/* Giảm theo vnd*/}
                      {item.promotionInfo != null &&
                        item.promotionInfo.promotionAmount != null && (
                          <div className="product_price_div">
                            <p className=" text-center">
                              <NumberFormat
                                value={
                                  item.price -
                                  item.promotionInfo.promotionAmount
                                }
                                className="text-center text-danger text-decoration-underline  "
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"đ"}
                                renderText={(value, props) => (
                                  <span {...props}>{value}</span>
                                )}
                              />
                              <span className="badge rounded-pill bg-danger ms-3">
                                {`- ${item.promotionInfo.promotionAmount} đ`}
                              </span>
                            </p>
                            <p className=" text-center m-0">
                              <NumberFormat
                                value={item.price}
                                className="text-center text-danger text-decoration-line-through  "
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"đ"}
                                renderText={(value, props) => (
                                  <span {...props}>{value}</span>
                                )}
                              />
                            </p>
                          </div>
                        )}
                      {/* Giảm theo % */}
                      {item.promotionInfo != null &&
                        item.promotionInfo.promotionPercent != null && (
                          <div className="product_price_div">
                            <p className="text-center m-0">
                              <NumberFormat
                                value={item.price - (item.price * 10) / 100}
                                className="text-center text-danger text-decoration-underline "
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"đ"}
                                renderText={(value, props) => (
                                  <span {...props}>{value}</span>
                                )}
                              />
                              <span className="badge rounded-pill bg-success ms-3">
                                -{item.promotionInfo.promotionPercent}%
                              </span>
                            </p>
                            <p className=" text-center m-0">
                              <NumberFormat
                                value={item.price}
                                className="text-center text-danger text-decoration-line-through  "
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"đ"}
                                renderText={(value, props) => (
                                  <span {...props}>{value}</span>
                                )}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </Container>
    </Fragment>
  );
}

export default SlickSliderRelatedProduct;

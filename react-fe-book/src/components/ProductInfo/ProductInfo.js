import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, ProgressBar } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./ProductInfo.css";
import SlickSlider from "../SlickSlider/SlickSlider";
import ReactStars from "react-rating-stars-component";
import ProductService from "../../api/ProductService";
import NumberFormat from "react-number-format";
function ProductInfo(props) {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [reviews, setReview] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  function getReviewDate(strDate) {
    var date = new Date(strDate + "Z");
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  function getReviewTime(strDate) {
    var date = new Date(strDate + "Z");
    return date.toLocaleTimeString();
  }

  useEffect(() => {
    setIsLoading(true);
    ProductService.getProductById(params.id)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data.result);
        setReview(response.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reRender]);

  return (
    <Fragment>
      <Header></Header>
      {!isLoading && (
        <Fragment>
          <div className="container-fluid">
            <nav aria-label="breadcrumb" className="mt-2 breadcrumb_nav">
              <ol className="breadcrumb mt-2 ms-2">
                <li className="breadcrumb-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <NavLink to="/">Book</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <p>{product.title}</p>
                </li>
              </ol>
            </nav>
          </div>
          <div className="container mt-2">
            <div className="row" key={Math.random()}>
              <div className="col-12 col-md-4">
                <img
                  src={product.imgUrl}
                  className="img-fluid rounded border border-5"
                  alt="..."
                />
              </div>
              <div className="col-12 col-md-8">
                <h1 className="pro_name">{product.title}</h1>
                <h3 className="pro_author text-muted">
                  <span className="red">
                    <i className="fas fa-user me-2"></i>Tác giả :
                  </span>{" "}
                  {product.authors.map((author) => {
                    return (
                      <p className="d-inline" key={author.id}>
                        {" "}
                        {author.name}
                      </p>
                    );
                  })}
                </h3>
                <h3 className="pro_author text-muted">
                  <span className="blue">
                    <i className="fas fa-book me-2"></i>NXB :
                  </span>{" "}
                  {product.publisher.name}
                </h3>
                <p className="pro_des">Sơ lược</p>
                <hr></hr>
                <p className="pro_des_long">{product.description}</p>
                <hr></hr>
                <p>
                  <span>
                    <i className="fas fa-dollar-sign me-2"></i>Giá
                  </span>{" "}
                  :{" "}
                  <span className="red">
                    <NumberFormat
                      value={product.price}
                      className="text-center text-danger text-decoration-underline  "
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                      renderText={(value, props) => (
                        <span {...props}>{value}</span>
                      )}
                    />
                  </span>
                </p>
                <p>
                  <span>
                    <i className="fas fa-tags me-2"></i>Thể loại :
                  </span>{" "}
                  {product.genres.map((genre) => {
                    return (
                      <span className="d-inline" key={genre.id}>
                        {" "}
                        {genre.name}
                      </span>
                    );
                  })}
                </p>
                <hr></hr>
                <button className="btn btn-round btn-info">
                  <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                </button>
                <button className="btn btn-round btn-info ms-2">
                  <i className="far fa-heart"></i> Thêm yêu thích
                </button>
              </div>
            </div>
            <hr></hr>
          </div>
          <div className="container mt-2">
            <h2 className="text-center text-monospace lead">
              <i className="fas fa-bars me-1"></i>Sách tương tự
              <i className="fas fa-bars ms-1"></i>
            </h2>
            <hr></hr>
            <SlickSlider></SlickSlider>
            <hr></hr>
            <h2 className="text-center text-monospace lead">
              <i className="fas fa-star me-1"></i>Đánh giá & Nhận xét
              <i className="fas fa-star ms-1"></i>
            </h2>
            <hr></hr>
            {/* Đánh giá */}
            <div className="row d-flex justify-content-center">
              <div className="rating_pro">
                <div className="d-flex flex-wrap justify-content-start w-100 ">
                  <p>
                    5<i className="far fa-star"></i>(100)
                  </p>
                  <ProgressBar
                    className="mt-1 ms-1"
                    variant="success"
                    now={40}
                    style={{ width: 80 + "%" }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-start w-100">
                  <p>
                    4<i className="far fa-star"></i>(100)
                  </p>
                  <ProgressBar
                    className="mt-1 ms-1"
                    variant="primary"
                    now={30}
                    style={{ width: 80 + "%" }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-start w-100">
                  <p>
                    3<i className="far fa-star"></i>(100)
                  </p>
                  <ProgressBar
                    className="mt-1 ms-1"
                    variant="info"
                    now={60}
                    style={{ width: 80 + "%" }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-start w-100">
                  <p>
                    2<i className="far fa-star"></i>(100)
                  </p>
                  <ProgressBar
                    className="mt-1 ms-1"
                    variant="warning"
                    now={20}
                    style={{ width: 80 + "%" }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-start w-100">
                  <p>
                    1<i className="far fa-star"></i>(100)
                  </p>
                  <ProgressBar
                    className="mt-1 ms-1"
                    variant="danger"
                    now={10}
                    style={{ width: 80 + "%" }}
                  />
                </div>
              </div>
            </div>
            {/* Bình luận */}
            <hr></hr>
            <div className="row mt-3 justify-content-center ">
              <div className="d-flex flex-column justify-content-center w-50">
                <h5 className="text-center">Sắp xếp theo</h5>
                <select
                  className="form-select w-50 align-self-center"
                  defaultValue={"new"}
                >
                  <option value="new">Mới nhất</option>
                  <option value="old">Cũ nhất</option>
                </select>
              </div>
            </div>
            {reviews.map((review) => {
              return (
                <div
                  className="row mt-3 border border-4 p-1"
                  key={review.userID}
                >
                  <div className="col-4 col-sm-2 border_right p-1">
                    <img
                      src={review.user.imgUrl}
                      className="img-fluid rounded border border-5"
                      alt="..."
                    />
                    <div className="d-flex justify-content-center text-center flex-column">
                      <p>
                        <i className="fas fa-user"></i> : {review.user.userName}
                      </p>
                      <p>
                        <i className="far fa-calendar-alt"></i> :
                        {getReviewDate(review.date)}
                      </p>
                      <p>
                        <i className="far fa-clock"></i> :{" "}
                        {getReviewTime(review.date)}
                      </p>
                    </div>
                  </div>
                  <div className="col-8 col-sm-10 p-1">
                    <div className="d-flex ps-3">
                      <ReactStars
                        count={review.star}
                        value={5}
                        edit={false}
                        //   onChange={ratingChanged}
                        size={24}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        filledIcon={<i className="fas fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      {review.star == 1 && (
                        <p className="mt-2"> - Rất không hài lòng</p>
                      )}
                      {review.star == 2 && (
                        <p className="mt-2"> - Không hài lòng</p>
                      )}
                      {review.star == 3 && <p className="mt-2"> - Hài lòng</p>}
                      {review.star == 4 && (
                        <p className="mt-2"> - Rất hài lòng</p>
                      )}
                      {review.star == 5 && (
                        <p className="mt-2"> - Cực kì hài lòng</p>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="pro_comment border border-3">
                        {review.content}
                      </p>
                    </div>
                    <p className="ps-3">
                      Khuyến khích mua :
                      {review.recomended && (
                        <span className="badge bg-success ms-2">
                          <i className="far fa-thumbs-up me-2 "></i>Nên mua
                        </span>
                      )}
                      {!review.recomended && (
                        <span className="badge bg-danger ms-2">
                          <i className="far fa-thumbs-down me-2 "></i>Không nên
                          mua
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="mb-5"></hr>
        </Fragment>
      )}

      <Footer></Footer>
    </Fragment>
  );
}

export default ProductInfo;

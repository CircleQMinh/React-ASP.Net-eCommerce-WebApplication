import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, ProgressBar } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./ProductInfo.css";
import SlickSliderRelatedProduct from "../SlickSlider/SlickSliderRelatedProduct";
import ReactStars from "react-rating-stars-component";
import ProductService from "../../api/ProductService";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";

function ProductInfo(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [related_Product, setRelatedProduct] = useState({});
  const [reviews, setReview] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [rating, setRating] = useState({});

  function getReviewDate(strDate) {
    var date = new Date(strDate + "Z");
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  function getReviewTime(strDate) {
    var date = new Date(strDate + "Z");
    return date.toLocaleTimeString();
  }
  function stringAuthorsName(listAuthor) {
    var string_authors = "";
    product.authors.forEach((author) => {
      string_authors += author.name;
      string_authors += " - ";
    });
    string_authors = string_authors.slice(0, string_authors.length - 3);
    //console.log(string_authors)
    return string_authors;
  }

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  }

  function onClickAddToCart(event) {
    event.preventDefault();
    var item = { product: product, quantity: 1 };
    dispatch(cart_slice_action.addToCart(item));
    dispatch(cart_slice_action.calculateCartTotal());
  }
  useEffect(() => {
    setIsLoading(true);
    setIsLoadingRelated(true);
    ProductService.getProductById(params.id)
      .then((response) => {
        // console.log(response.data);
        setProduct(response.data.result);
        setReview(response.data.reviews);
        var cal = { five: 0, four: 0, three: 0, two: 0, one: 0 };
        response.data.reviews.forEach((r) => {
          switch (r.star) {
            case 5:
              cal.five += 1;
              break;
            case 4:
              cal.four += 1;
              break;
            case 3:
              cal.three += 1;
              break;
            case 2:
              cal.two += 1;
              break;
            case 1:
              cal.one += 1;
              break;
            default:
              break;
          }
        });
        setRating(cal);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        
      });

    ProductService.getRelatedProductById(params.id,8)
      .then((response) => {
        //console.log(response.data);
        setRelatedProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingRelated(false);
      });
  }, [reRender, params.id]);

  function ReRender(){
    setReRender(!reRender)
  }
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
                  {stringAuthorsName(product.authors)}
                </h3>
                <h3 className="pro_author text-muted">
                  <span className="blue">
                    <i className="fas fa-book me-2"></i>NXB :
                  </span>{" "}
                  {product.publisher.name}
                </h3>
                <h3 className="pro_author text-muted">
                  <span className="green">
                    <i className="fas fa-print me-2"></i>Năm xuất bản :
                  </span>{" "}
                  {product.publishYear}
                </h3>
                <p className="pro_des">Sơ lược</p>
                <hr></hr>
                <p className="pro_des_long">{product.description}</p>
                <hr></hr>
                <p>
                  <span>
                    <i className="fas fa-dollar-sign me-2"></i>Giá :
                  </span>

                  {product.promotionInfo == null && (
                    <NumberFormat
                      value={product.price}
                      className="text-center text-danger  fs-3 ms-2 "
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                      renderText={(value, props) => (
                        <span {...props}>{value}</span>
                      )}
                    />
                  )}
                  {product.promotionInfo != null &&
                    product.promotionInfo.promotionAmount != null && (
                      <Fragment>
                        <NumberFormat
                          value={
                            product.price -
                            product.promotionInfo.promotionAmount
                          }
                          className="text-center text-danger fs-3 ms-2 "
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          renderText={(value, props) => (
                            <span {...props}>{value}</span>
                          )}
                        />
                        <NumberFormat
                          value={product.price}
                          className="text-center text-muted text-decoration-line-through mx-3 "
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          renderText={(value, props) => (
                            <span {...props}>{value}</span>
                          )}
                        />
                        <NumberFormat
                          value={-product.promotionInfo.promotionAmount}
                          className="badge rounded-pill bg-danger "
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          renderText={(value, props) => (
                            <span {...props}>{value}</span>
                          )}
                        />
                      </Fragment>
                    )}
                  {product.promotionInfo != null &&
                    product.promotionInfo.promotionPercent != null && (
                      <Fragment>
                        <NumberFormat
                          value={
                            product.price -
                            (product.price *
                              product.promotionInfo.promotionPercent) /
                              100
                          }
                          className="text-center text-danger ms-2 fs-3"
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          renderText={(value, props) => (
                            <span {...props}>{value}</span>
                          )}
                        />
                        <NumberFormat
                          value={product.price}
                          className="text-center text-muted text-decoration-line-through mx-3 "
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          renderText={(value, props) => (
                            <span {...props}>{value}</span>
                          )}
                        />
                        <span className="badge rounded-pill bg-danger ">
                          -{product.promotionInfo.promotionPercent}%
                        </span>
                      </Fragment>
                    )}
                </p>
                <p>
                  <span>
                    <i className="fas fa-tags me-2"></i>Thể loại :
                  </span>{" "}
                  {product.genres.map((genre) => {
                    return (
                      <span className="d-inline mx-1" key={genre.id}>
                        {" "}
                        <a
                          style={{
                            color: getRandomColor(),
                          }}
                          href={`/search?genre=${genre.id}`}
                        >
                          &#9734;{genre.name}
                        </a>
                      </span>
                    );
                  })}
                </p>
                <hr></hr>
                <button
                  className="btn btn-round btn-info"
                  onClick={onClickAddToCart}
                >
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
            {!isLoadingRelated && (
              <SlickSliderRelatedProduct
                items={related_Product}
              ></SlickSliderRelatedProduct>
            )}

            <hr></hr>
            <h2 className="text-center text-monospace lead">
              <i className="fas fa-star me-1"></i>Đánh giá & Nhận xét
              <i className="fas fa-star ms-1"></i>
            </h2>
            <hr></hr>
            {/* Đánh giá */}
            
            <div className="row d-flex justify-content-center">
              {reviews.length > 0 && (
                <div className="rating_pro">
                  <div className="d-flex flex-wrap justify-content-start w-100 ">
                    <p>
                      5<i className="far fa-star"></i>({rating.five})
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="success"
                      now={(rating.five * 100) / reviews.length}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      4<i className="far fa-star"></i>({rating.four})
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="primary"
                      now={(rating.four * 100) / reviews.length}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      3<i className="far fa-star"></i>({rating.three})
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="info"
                      now={(rating.three * 100) / reviews.length}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      2<i className="far fa-star"></i>({rating.two})
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="warning"
                      now={(rating.two * 100) / reviews.length}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      1<i className="far fa-star"></i>({rating.one})
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="danger"
                      now={(rating.one * 100) / reviews.length}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                </div>
              )}
              {reviews.length == 0 && (
                <div className="rating_pro">
                  <p className="text-center">
                    Chưa có nhận xét cho sản phẩm này.
                  </p>
                  <div className="d-flex flex-wrap justify-content-start w-100 ">
                    <p>
                      5<i className="far fa-star"></i>(0)
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="success"
                      now={0}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      4<i className="far fa-star"></i>(0)
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="primary"
                      now={0}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      3<i className="far fa-star"></i>(0)
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="info"
                      now={0}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      2<i className="far fa-star"></i>(0)
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="warning"
                      now={0}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-start w-100">
                    <p>
                      1<i className="far fa-star"></i>(0)
                    </p>
                    <ProgressBar
                      className="mt-1 ms-1"
                      variant="danger"
                      now={0}
                      style={{ width: 80 + "%" }}
                    />
                  </div>
                </div>
              )}
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
            {reviews.length == 0 && (
              <p className="text-center mt-3">
                Chưa có nhận xét nào cho sản phẩm này.
              </p>
            )}
            {reviews.length > 0 &&
              reviews.map((review) => {
                return (
                  <div
                    className="row mt-3 border border-4 p-1"
                    key={review.userID}
                  >
                    <div className="col-4 col-sm-2 border_right p-1 d-flex flex-column justify-content-center">
                      <img
                        src={review.user.imgUrl}
                        className="img-fluid rounded border border-5 img_review"
                        alt="..."
                      />
                      <div className="d-flex justify-content-center text-center flex-column">
                        <p>
                          <i className="fas fa-user"></i> :{" "}
                          {review.user.userName}
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
                        {review.star == 3 && (
                          <p className="mt-2"> - Hài lòng</p>
                        )}
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
                            <i className="far fa-thumbs-down me-2 "></i>Không
                            nên mua
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
      {isLoading && (
        <div className=" full_page_spinner ">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="lead text-center mt-2">
            Đang tải thông tin. Xin chờ một tí...
          </p>
        </div>
      )}

      <Footer></Footer>
    </Fragment>
  );
}

export default ProductInfo;

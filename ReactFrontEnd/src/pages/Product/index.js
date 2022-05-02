import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Breadcrumb } from "../../components/BreadCrumb";
import "./product.css";
import ProductService from "../../api/ProductService";
import { useSelector, useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";
import SlickSlider from "../../components/SlickSlider/SlickSlider";
import { LoadingScreen } from "../../components/Loading";
import { ListReview } from "./components/reviewList";
import { ProductDetail } from "./components/productDetail";
import { Comment } from "./components/comment";
import { toast } from "react-toastify";

function ProductInfo(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [related_Product, setRelatedProduct] = useState([]);
  const [reviews, setReview] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [rating, setRating] = useState({});
  const [openComment, setOpenComment] = useState(false);

  function onClickAddToCart(event) {
    event.preventDefault();
    var item = { product: product, quantity: 1 };
    dispatch(cart_slice_action.addToCart(item));
    dispatch(cart_slice_action.calculateCartTotal());
  }

  const onClickComment = () => {
    document.getElementById("commentWrapper").scrollIntoView();
    setOpenComment(true);
  };

  const handleListReview = (review, isUpdate) => {
    const reviewsSlice = reviews.slice();
    if (reviewsSlice.length > 0) {
      if (isUpdate) {
        const indexReview = reviewsSlice.findIndex(
          (value) => review.userID === value.userID
        );
        reviewsSlice.splice(indexReview, 1);
        // reviewsSlice[indexReview] = review
        toast.success("chỉnh sửa đánh giá thành công");
        window.location.reload()
      }
      reviewsSlice.unshift(review);
      setReview(reviewsSlice);
    } else {
      setReview([review]);
    }
    if (!isUpdate) {
      toast.success("Đánh giá thành công");
      window.location.reload()
    }
  };

  const handleDeletedComment = (review) => {
    const reviewsSlice = reviews.slice();
    const indexReview = reviewsSlice.findIndex(
      (value) => review.userID === value.userID
    );
    reviewsSlice.splice(indexReview, 1);
    setReview(reviewsSlice);
  };

  const getRating = () => {
    setIsLoading(true);
    ProductService.getProductById(params.id)
      .then((response) => {
        setProduct(response.data.result);
        setReview(response.data.reviews.reverse());
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
  }

  useEffect(() => {
    getRating();
    setIsLoadingRelated(true);
    ProductService.getRelatedProductById(params.id, 8)
      .then((response) => {
        setRelatedProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingRelated(false);
      });
  }, [reRender, params.id]);

  function ReRender() {
    setReRender(!reRender);
  }

  return (
    <Fragment>
      <Header></Header>
      {!isLoading && (
        <Fragment>
          <Breadcrumb
            list={[
              { name: "Home", path: "/" },
              { name: "Book", path: "/" },
            ]}
            title={product?.title}
          />
          <ProductDetail
            product={product}
            onClickAddToCart={onClickAddToCart}
            onClickComment={onClickComment}
          />
          <div className="container mt-2">
            <h2 className="text-center text-monospace lead">
              <i className="fas fa-bars me-1"></i>
              <span style={{ fontSize: 20, fontWeight: 500 }}>
                Sách tương tự
              </span>
              <i className="fas fa-bars ms-1"></i>
            </h2>
            <hr></hr>
            {!isLoadingRelated && (
              <>
                {related_Product.length > 0 ? (
                  <SlickSlider items={related_Product} />
                ) : (
                  <LoadingScreen />
                )}
              </>
            )}

            <hr></hr>
            <h2 className="text-center text-monospace lead">
              <i className="fas fa-star me-1"></i>
              <span style={{ fontSize: 20, fontWeight: 500 }}>
                Đánh giá & Nhận xét
              </span>
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
                    Chưa có đánh giá cho sản phẩm này.
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
            {reviews.length == 0 && (
              <>
                <p className="text-center mt-3">
                  Chưa có nhận xét nào cho sản phẩm này.
                </p>
                <div id="commentWrapper">
                  <Comment
                    openComment={openComment}
                    setOpenComment={setOpenComment}
                    bookId={params.id}
                    handleListReview={handleListReview}
                  />
                </div>
              </>
            )}
            {reviews.length > 0 && (
              <>
                <hr></hr>
                <div className="row mt-2 justify-content-center ">
                  <div className="d-flex flex-column justify-content-center w-50">
                    <span
                      style={{ fontSize: 20, fontWeight: 500 }}
                      className="text-center mb-2"
                    >
                      Sắp xếp theo
                    </span>
                    <select
                      className="form-select w-50 align-self-center"
                      defaultValue={"new"}
                    >
                      <option value="new">Mới nhất</option>
                      <option value="old">Cũ nhất</option>
                    </select>
                  </div>
                </div>
                <div id="commentWrapper">
                  <Comment
                    openComment={openComment}
                    setOpenComment={setOpenComment}
                    bookId={params.id}
                    handleListReview={handleListReview}
                    getRating={getRating}
                  />
                </div>
                <ListReview
                  reviews={reviews}
                  onClickComment={onClickComment}
                  handleDeletedComment={handleDeletedComment}
                  getRating={getRating}
                />
              </>
            )}
          </div>

          <div className="mb-5"></div>
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

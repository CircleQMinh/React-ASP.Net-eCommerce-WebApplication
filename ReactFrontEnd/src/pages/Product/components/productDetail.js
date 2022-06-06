import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";

import "../product.css";
import {
  stringAuthorsName,
  getRandomColor,
  formatCurrencyVN,
} from "../../../utils";
import ProductService from "../../../api/ProductService";

export const ProductDetail = (props) => {
  const { product, onClickAddToCart, onClickComment } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const user = JSON.parse(localStorage.getItem(`user`));

  const favoriteBook = async () => {
    const token = localStorage.getItem(`token`);
    if (token && user) {
      if (isFavorite) {
        await ProductService.removeFromWishList(user?.id, product?.id, token)
          .then((response) => {
            if (response?.data?.success) {
              setIsFavorite(false);
              toast.success(
                `Bỏ yêu thích sản phẩm ${product?.title} thành công`
              );
            } else {
              toast.error(`Có lỗi xảy ra`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await ProductService.addToWishList(user?.id, product?.id, token)
          .then((response) => {
            if (response?.data?.success) {
              setIsFavorite(true);
              toast.success(`Yêu thích sản phẩm ${product?.title} thành công`);
            } else {
              toast.error(`Có lỗi xảy ra`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      toast.warning("Bạn cần phải đăng nhập để thực hiện thao tác này");
    }
  };

  useEffect(() => {
    if (product && user && product?.wishlistUsers?.length > 0) {
      const favorite = product?.wishlistUsers.find(
        (item) => item.id === user.id
      );
      if (favorite) {
        setIsFavorite(true);
      }
    }
  }, []);

  return (
    <div className="container mt-2 p-4 bg-aliceblue opacity-90 ">
      <div className="row" key={Math.random()}>
        <div className="col-12 col-md-4">
          <img
            src={product.imgUrl}
            className="img-fluid rounded  border_product"
            alt="..."
          />
        </div>
        <div className="col-12 col-md-8 mb-2">
          <h1 className="pro_name">{product.title}</h1>
          <h3 className="pro_author text-muted">
            <span className="red">
              <i className="fas fa-user me-2"></i>Tác giả :
            </span>{" "}
            {stringAuthorsName(product)}
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
          <div>
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
                renderText={(value, props) => <span {...props}>{value}</span>}
              />
            )}
            {product.promotionInfo != null &&
              product.promotionInfo.promotionAmount != null && (
                <>
                  <span className="text-center text-danger fs-3 ms-2">
                    {formatCurrencyVN(
                      product.price - product.promotionInfo.promotionAmount
                    )}
                    đ
                  </span>
                  <span className="text-center text-muted text-decoration-line-through mx-3">
                    {formatCurrencyVN(product.price)}đ
                  </span>
                  <span className="badge rounded-pill bg-danger">
                    -{formatCurrencyVN(product.promotionInfo.promotionAmount)}đ
                  </span>
                </>
              )}
            {product.promotionInfo != null &&
              product.promotionInfo.promotionPercent != null && (
                <>
                  <span className="text-center text-danger ms-2 fs-3">
                    {formatCurrencyVN(
                      product.price -
                        (product.price *
                          product.promotionInfo.promotionPercent) /
                          100
                    )}
                    đ
                  </span>
                  <span className="text-center text-muted text-decoration-line-through mx-3">
                    {formatCurrencyVN(product.price)}đ
                  </span>
                  <span className="badge rounded-pill bg-danger ">
                    -{product.promotionInfo.promotionPercent}%
                  </span>
                </>
              )}
          </div>
          <div className="mb-2">
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
                    className="category"
                    href={generateGenreLink(genre)}
                  >
                    &#9734;{genre.name}
                  </a>
                </span>
              );
            })}
          </div>
          <button
            className="btn btn-round btn-info mt-2 me-2"
            onClick={onClickAddToCart}
          >
            <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
          </button>
          <button
            className="btn btn-round btn-info me-2 mt-2"
            onClick={favoriteBook}
          >
            <i
              className={` fa-solid ${
                isFavorite ? "favorite fa-circle-xmark" : "fa-heart"
              }`}
            ></i>{" "}
            {isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"}
          </button>
          <button
            className="btn btn-round btn-info me-2 mt-2"
            onClick={onClickComment}
          >
            <i className="fa-solid fa-comment"></i> Đánh giá
          </button>
        </div>
        <div>
          <hr></hr>
          <div className="pro_des">Sơ lược</div>
          <p className="pro_des_long">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

function generateGenreLink(genre){
  // /search?&genre=[{%22name%22:%22Thi%E1%BA%BFu%20Nhi%22,%22id%22:%22checkbox_genre_15%22}]&page=1&pageSize=8&priceRange=0,99999999

  return `/search?&genre=[{%22name%22:"${genre.name}",%22id%22:%22checkbox_genre_${genre.id}%22}]&page=1&pageSize=8&priceRange=0,99999999`
}
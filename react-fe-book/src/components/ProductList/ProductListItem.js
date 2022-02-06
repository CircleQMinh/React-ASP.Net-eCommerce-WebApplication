import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import {  cart_slice_action } from "../../redux/cart_slice.js";

function ProductListItem(props) {
  // console.log(props.item);

  const dispatch = useDispatch();

  function onClickAddToCart(event){
    event.preventDefault()
    var item = {product:props.item,quantity:1}
    dispatch(cart_slice_action.addToCart(item))
    dispatch(cart_slice_action.calculateCartTotal())
  }
  return (
    <Fragment>
      <div className="col col-xs-8 col-md-6 col-lg-4 col-xl-3 ">
        <div className="card border border-4 rounded-3 mb-2">
          <img
            src={props.item.imgUrl}
            className="card-img-top product_img"
            alt={`Product ${props.item.id}`}
          />

          <div className="card-body">
            <h5 className="card-title product_name">{props.item.title}</h5>

            {/* Không có giảm giá */}
            {props.item.promotionInfo === null && (
              <div className="product_price_div">
                <p className="text-center">
                  <NumberFormat
                    value={props.item.price}
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
            {props.item.promotionInfo != null &&
              props.item.promotionInfo.promotionAmount != null && (
                <div className="product_price_div">
                  <p className=" text-center">
                    <NumberFormat
                      value={props.item.price-props.item.promotionInfo.promotionAmount}
                      className="text-center text-danger text-decoration-underline  "
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                      renderText={(value, props) => (
                        <span {...props}>{value}</span>
                      )}
                    />
                    <span className="badge rounded-pill bg-danger ms-3">
                      {`- ${props.item.promotionInfo.promotionAmount} đ`} 
                    </span>
                  </p>
                  <p className=" text-center m-0">
                    <NumberFormat
                      value={props.item.price}
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
            {props.item.promotionInfo != null &&
              props.item.promotionInfo.promotionPercent != null && (
                <div className="product_price_div">
                  <p className="text-center m-0">
                    <NumberFormat
                      value={props.item.price - (props.item.price * 10) / 100}
                      className="text-center text-danger text-decoration-underline "
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                      renderText={(value, props) => (
                        <span {...props}>{value}</span>
                      )}
                    />
                    <span className="badge rounded-pill bg-success ms-3">
                      -{props.item.promotionInfo.promotionPercent}%
                    </span>
                  </p>
                  <p className=" text-center m-0">
                    <NumberFormat
                      value={props.item.price}
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
            <hr></hr>
            <div className="d-grid gap-2 mt-2">
              <button className="btn btn-success" type="button" onClick={onClickAddToCart}>
                <i className="fas fa-shopping-cart me-2"></i>Add to Cart
              </button>
              <button className="btn btn-danger" type="button">
                <i className="far fa-heart me-2"></i> Add to Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductListItem;

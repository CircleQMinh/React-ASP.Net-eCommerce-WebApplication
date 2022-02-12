import { React, Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";
function CartItem(props) {
  const item = props.cartItem;
  const dispatch = useDispatch();

 // console.log(item);
  //function

  function onFlusIconClick() {
    var product = { ...item };
    product.quantity = 1;
    dispatch(cart_slice_action.addToCart(product));
    dispatch(cart_slice_action.calculateCartTotal())
  }

  function onMinusIconClick() {
    var product = { ...item };
    product.quantity = 1;
    dispatch(cart_slice_action.removeFromCart(product));
    dispatch(cart_slice_action.calculateCartTotal())
  }

  function onDeleteButtonClick() {
    var product = { ...item };
    product.quantity = 1;
    dispatch(cart_slice_action.deleteFromCart(product));
    dispatch(cart_slice_action.calculateCartTotal())
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-5">
          <img
            src={item.product.imgUrl}
            className="img-fluid rounded border border-5"
            alt="..."
          />
        </div>
        <div className="col-7 ">
          <div className="d-flex align-items-center flex-column">
            <p className="text-monospace m-0">{item.product.title}</p>
            <div className="text-sm text-muted m-0 text-start">
              {item.product.promotionInfo == null && (
                <NumberFormat
                  value={item.product.price}
                  className="text-center text-danger   "
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                />
              )}
              {item.product.promotionInfo != null &&
                item.product.promotionInfo.promotionAmount != null && (
                  <Fragment>
                    <p className=" text-center">
                      <NumberFormat
                        value={
                          item.product.price -
                          item.product.promotionInfo.promotionAmount
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
                        {`- ${item.product.promotionInfo.promotionAmount} đ`}
                      </span>
                    </p>
                    <p className=" text-center m-0">
                      <NumberFormat
                        value={item.product.price}
                        className="text-center text-danger text-decoration-line-through  "
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                        renderText={(value, props) => (
                          <span {...props}>{value}</span>
                        )}
                      />
                    </p>
                  </Fragment>
                )}
              {item.product.promotionInfo != null &&
                item.product.promotionInfo.promotionPercent != null && (
                  <Fragment>
                    <p className="text-center m-0">
                      <NumberFormat
                        value={
                          item.product.price - (item.product.price * item.product.promotionInfo.promotionPercent) / 100
                        }
                        className="text-center text-danger text-decoration-underline "
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                        renderText={(value, props) => (
                          <span {...props}>{value}</span>
                        )}
                      />
                      <span className="badge rounded-pill bg-success ms-3">
                        -{item.product.promotionInfo.promotionPercent}%
                      </span>
                    </p>
                    <p className=" text-center m-0">
                      <NumberFormat
                        value={item.product.price}
                        className="text-center text-danger text-decoration-line-through  "
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                        renderText={(value, props) => (
                          <span {...props}>{value}</span>
                        )}
                      />
                    </p>
                  </Fragment>
                )}
            </div>
            <hr className="w-100 m-0"></hr>
            <div className="d-flex justify-content-between w-100 mt-2">
              <button
                className="btn btn-sm btn-success btn_cart"
                onClick={onMinusIconClick}
              >
                <i className="fas fa-minus"></i>
              </button>
              <p className="mx-2 pt-2">{item.quantity}</p>
              <button
                className="btn btm-sm btn-success btn_cart"
                onClick={onFlusIconClick}
              >
                <i className="fas fa-plus"></i>
              </button>{" "}
            </div>
            <div className="d-grid gap-2 w-100">
              <button
                className="btn btn-danger"
                type="button"
                onClick={onDeleteButtonClick}
              >
                Xóa khỏi giỏ hàng <i className="far fa-times-circle ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr key={item.product.id + 1} className="m-0 my-2"></hr>
    </Fragment>
  );
}

export default CartItem;

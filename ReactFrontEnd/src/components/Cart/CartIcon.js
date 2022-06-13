import { React, Fragment, useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";
import CartItem from "./CartItem.js";
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { TitleNav } from "../../pages/Home/components/TitleNav.js";

function CartIcon(props) {
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();
  // dispatch(cart_slice_action.getCartFromLocalStorage());
  const items = useSelector((state) => state.cart_slice.items);
  const totalItem = useSelector((state) => state.cart_slice.totalItem);
  const totalPrice = useSelector((state) => state.cart_slice.totalPrice);

  //function
  // var date = new Date()
  // console.log(date.toISOString())
  const navigate = useNavigate();

  function onHoverOnCartIcon() {
    setIsHover(true);
  }

  function onNotHoverOnCartIcon() {
    setIsHover(false);
  }

  function onClickResetCartBTN(){
    dispatch(cart_slice_action.resetCart())
    //dispatch(cart_slice_action.calculateCartTotal())
  }


  return (
    <Fragment>
      <a
        className="float-btn-cart"
        onMouseEnter={onHoverOnCartIcon}
        onMouseLeave={onNotHoverOnCartIcon}
      >
        <i className="fas fa-shopping-cart float-btn-icon"></i>
      </a>
      <a className="float-btn-cart-number text_decoration_none animate__animated animate__slideInRight animate__faster ">
        <p className="text-monospace">{totalItem}</p>
      </a>
      {isHover && (
        <Fragment>
          <a
            className="float-btn-cart-price text_decoration_none animate__animated animate__slideInRight animate__faster"
            key={"info"}
          >
            <p>Thông tin giỏ hàng</p>
          </a>
          <div
            className="cart_item_list p-2 shadow-lg border rounded animate__animated animate__slideInRight "
            onMouseLeave={onNotHoverOnCartIcon}
            onMouseEnter={onHoverOnCartIcon}
          >
            <div className="container d-flex justify-content-center flex-column text-center mb-1 ">
              <p className="mb-1">
                Tổng giá trị :{" "}
                <NumberFormat
                  value={totalPrice}
                  className="text-center priceTotal "
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                />
              </p>
              <p>Tổng số sản phẩm : <a className="totalProduct"> {totalItem}</a></p>
              <div
                className="btn-group w-100"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button type="button" className="btn btn-warning" onClick={() =>  navigate('/checkout')}>
                  <i className="fas fa-money-check-alt me-2"></i>Thanh toán
                </button>
                <button type="button" className="btn btn-danger" onClick={onClickResetCartBTN}>
                  <i className="far fa-times-circle ms-2"></i>  Xóa giỏ hàng
                </button>
              </div>
              {/* <p className="mt-2 lead fw-normal">Danh sách sản phẩm</p> */}
             <TitleNav title="Danh sách sản phẩm" style={{ margin: "8px 0 0 0",  }} disableIcon={true}/>

            </div>
            <div className="items_list pe-2">
              {items.length == 0 && (
                <img
                  className="img-fluid"
                  alt="noproduct"
                  src="https://www.gamkart.com/frontend/img/empty-cart.png"
                ></img>
              )}
              {items.length > 0 &&
                items.map((item) => {
                  return (
                    <CartItem cartItem={item} key={item.product.id}></CartItem>
                  );
                })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default CartIcon;

import { React, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {useLocation ,useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import {  useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";
import OrderService from "../../api/OrderService";
import { toast } from "react-toastify";
function Thankyou() {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  let { search } = useLocation();
  const url = new URLSearchParams(search);

  var vnp_ResponseCode = url.get("vnp_ResponseCode")
  console.log(vnp_ResponseCode)

  var order = localStorage.getItem("order")
  if(order){
    order = JSON.parse(order)
    if(vnp_ResponseCode=="00"&&localStorage.getItem("order")){
      console.log("gửi order")
      OrderService.PostOrder(order)
      .then((response) => {
        if (response.data.success) {
          toast.success("Đặt đơn hàng thành công!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          alert("Có lỗi xảy ra!");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        localStorage.removeItem("order")
        dispatch(cart_slice_action.resetCart());
      });



    }
    if(vnp_ResponseCode==24){
      navigate("/checkout")
    }
  }

  return (
    <Fragment>
      <Header></Header>
      <div className="container mt-4">
        <div className="thank-label">
          <div className="jumbotron text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead">
              <strong>Cám ơn bạn</strong> đã mua sắm với chúng tôi.
            </p>
            <p>
              Email với thông tin của đơn hàng đã được gửi đến email của bạn.
            </p>
            <hr></hr>
            <p>
              Gặp khó khăn? <Link to={"/contact"}>Liên hệ ngay</Link>
            </p>

            <p className="lead">
              <NavLink to={"/home"} className="btn btn-primary btm-sm">
                Trở về trang chủ
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Thankyou;

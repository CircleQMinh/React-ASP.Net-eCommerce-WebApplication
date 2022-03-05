import { React, Fragment, useEffect, useState } from "react";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { cart_slice_action } from "../../redux/cart_slice.js";
import { useForm } from "react-hook-form";
import { auth_action } from "../../redux/auth_slice.js";
import { useNavigate } from "react-router-dom";
import OrderService from "../../api/OrderService";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import DiscountService from "../../api/DiscountService";
function Checkout(props) {
  //var
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

  const items = useSelector((state) => state.cart_slice.items);
  const totalItem = useSelector((state) => state.cart_slice.totalItem);
  const totalPrice = useSelector((state) => state.cart_slice.totalPrice);

  const [discountCode, setDiscountCode] = useState(null);

  const navigate = useNavigate();

  var District = [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Thủ Đức",
    "Quận Gò Vấp",
    "Quận Bình Thạnh",
    "Quận Tân Bình",
    "Quận Tân Phú",
    "Quận Phú Nhuận",
    "Quận Bình Tân",
    "Huyện Củ Chi",
    "Huyện Hóc Môn",
    "Huyện Bình Chánh",
    "Huyện Nhà Bè",
    "Huyện Cần Giờ",
  ];

  var Ward = [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 6",
    "Phường 7",
    "Phường 8",
    "Phường 9",
    "Phường 10",
    "Phường 11",
    "Phường 12",
    "Phường 13",
    "Phường 14",
    "Phường 15",
  ];

  let {
    register,
    handleSubmit,
    watch,
    setValue ,
    formState: { errors },
  } = useForm();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleCloseLoadingModal = () => setShowLoadingModal(false);
  const handleShowLoadingModal = () => setShowLoadingModal(true);

  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleCloseDiscountModal = () => {
    setShowDiscountModal(false);
  };
  const handleShowDiscountModal = () => {
    setShowDiscountModal(true);
  };
  //function

  window.scrollTo(0, 0);
  function getAddressString(addno, street, ward, district, city) {
    return `${addno} ${street}, ${ward}, ${district}, ${city}`;
  }

  function reEnterUserForm(){
    var data = JSON.parse(localStorage.getItem("order_form"))
    if(data!=null){
      setValue("contactName",data.contactName)
      setValue("addressNo",data.addressNo)
      setValue("street",data.street)
      setValue("ward",data.ward)
      setValue("district",data.district)
      setValue("city",data.city)
      setValue("phoneNumber",data.phoneNumber)
      setValue("paymentMethod",data.paymentMethod)
      setValue("note",data.note)
      setValue("email",data.email)
      toast.success("Tự động điền form cho bạn!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  function SendOrder(data) {
    setShowLoadingModal(true);
    var date = new Date();
    var order = {
      userID: user.id,
      contactName: data.contactName,
      address: getAddressString(
        data.addressNo,
        data.street,
        data.ward,
        data.district,
        data.city
      ),
      phone: data.phoneNumber,
      email: data.email,
      paymentMethod: data.paymentMethod,
      orderDate: date.toISOString(),
      totalItem: totalItem,
      totalPrice: totalPrice,
      status: 0,
      note: data.note,
      orderDetails: [],
      discountCodeID: discountCode == null ? null : discountCode.id,
    };
    //console.log(order.orderDate)

    items.forEach((item) => {
      var orderItem = {
        bookId: item.product.id,
        quantity: item.quantity,
        promotionPercent: item.product.promotionInfo
          ? item.product.promotionInfo.promotionPercent
          : null,
        promotionAmount: item.product.promotionInfo
          ? item.product.promotionInfo.promotionAmount
          : null,
      };
      order.orderDetails.push(orderItem);
    });
    // console.log(order);
    localStorage.setItem("order_form", JSON.stringify(data));
    localStorage.setItem("order", JSON.stringify(order));
    if (order.paymentMethod == "vnpay") {
      var vnpay_total = order.totalPrice
      if(discountCode!=null){
        if(discountCode.discountAmount!=null){
          vnpay_total = order.totalPrice-discountCode.discountAmount
        }
        else{
          vnpay_total=order.totalPrice-(discountCode.discountPercent*order.totalPrice)/100
        }
      }
      OrderService.GetVnPayUrl(vnpay_total)
        .then((response) => {
          var url = response.data.paymentUrl;
          window.location.href = url;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      OrderService.PostOrder(order)
        .then((response) => {
          if (response.data.success) {
            dispatch(cart_slice_action.resetCart());
            toast.success("Đặt đơn hàng thành công!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            navigate("/thankyou");
          } else {
            alert("Có lỗi xảy ra!");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setShowLoadingModal(false);
          localStorage.removeItem("order");
        });
    }
  }

  function ApplyDiscountCode() {
    var code = document.getElementById("discount_code_input").value;
    if (!code) {
      return;
    }
    //console.log(code)
    setIsChecking(true);
    DiscountService.ApplyDiscountCode(code)
      .then((res) => {
        if (res.data.success) {
          setDiscountCode(res.data.discountCode);
          toast.success("Thêm mã giảm giá thành công!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(res.data.msg, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsChecking(false);
        setShowDiscountModal(false);
      });
  }


  useEffect(() => {
    if(isLoggedIn){
      reEnterUserForm();
    }
  }, [isLoggedIn,reEnterUserForm])
  



  return (
    <Fragment>
      <Header></Header>
      <div className="container-fluid">
        <nav aria-label="breadcrumb" className="mt-2 breadcrumb_nav">
          <ol className="breadcrumb mt-2 ms-2">
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <p>Checkout</p>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-3 d-flex justify-content-center border-bottom border-end border-4">
            <img
              src="https://res.cloudinary.com/dkmk9tdwx/image/upload/v1628192627/logo_v5ukvv.png"
              style={{ height: "65px", width: "65px" }}
              alt="Nav Icon"
              className="d-inline"
            />
            <p className="lead mt-3 fw-bold">Circle's Shop</p>
          </div>
          <div className="col-9 border-bottom border-4">
            <p className="lead mt-3">
              <i className="fas fa-money-check-alt me-2"></i>Thanh toán
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-4 ">
        <div className="row">
          {isLoggedIn && totalItem == 0 && (
            <div className="col-sm-12 col-lg-9 p-2 border border-2 animate__animated animate__bounceInLeft d-flex justify-content-center">
              <img
                className="img-fluid"
                src="https://www.gamkart.com/frontend/img/empty-cart.png"
                alt="noproduct"
              ></img>
            </div>
          )}
          {!isLoggedIn && (
            <div className="col-sm-12 col-lg-9 p-2 border border-2 animate__animated animate__bounceInLeft">
              <div className="container d-flex flex-column">
                <p className="text-center fw-bold">Hãy đăng nhập để tiếp tục</p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    localStorage.setItem("redirect", "/checkout");
                    navigate("/login");
                  }}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Đăng nhập
                </button>
              </div>
            </div>
          )}
          {isLoggedIn && totalItem > 0 && (
            <div className="col-sm-12 col-lg-9 p-2 border border-2 animate__animated animate__bounceInLeft">
              <div className="container ">
                <form>
                  <p className="fw-bold lead">Thông tin liên lạc</p>
                  <div className="mb-3">
                    <label className="form-label">Tên liên lạc: </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("contactName", {
                        required: true,
                      })}
                    ></input>
                    {errors.contactName?.type === "required" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Tên liên lạc chưa điền
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    ></input>
                    {errors.email?.type === "required" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Email chưa điền
                      </div>
                    )}
                    {errors.email?.type === "pattern" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Email không hợp lệ
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại: </label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("phoneNumber", {
                        required: true,
                        minLength: 9,
                        maxLength: 10,
                      })}
                    ></input>
                    {errors.phoneNumber?.type === "required" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle"></i>SDT không
                        để trống
                      </div>
                    )}
                    {errors.phoneNumber?.type === "minLength" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle"></i>SDT không
                        hợp lệ
                      </div>
                    )}
                    {errors.phoneNumber?.type === "maxLength" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle"></i>SDT không
                        hợp lệ
                      </div>
                    )}
                  </div>
                  <p className="fw-bold lead">Địa chỉ nhận hàng</p>
                  <div className="mb-3">
                    <label className="form-label">Số nhà: </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("addressNo", {
                        required: true,
                      })}
                    ></input>
                    {errors.addressNo?.type === "required" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle me-2"></i>Số
                        nhà chưa điền
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Đường: </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("street", {
                        required: true,
                      })}
                    ></input>
                    {errors.street?.type === "required" && (
                      <div className="form-text">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Tên đường chưa điền
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phường: </label>
                    <select
                      className="form-select"
                      defaultValue={"Phường 1"}
                      {...register("ward", {
                        required: true,
                      })}
                    >
                      {Ward.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quận: </label>
                    <select
                      className="form-select"
                      defaultValue={"Quận 1"}
                      {...register("district", {
                        required: true,
                      })}
                    >
                      {District.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thành phố: </label>
                    <select
                      className="form-select"
                      defaultValue={"TP.HCM"}
                      {...register("city", {
                        required: true,
                      })}
                    >
                      <option value="TP.HCM">TP.HCM</option>
                    </select>
                  </div>
                  <p className="fw-bold lead">Ghi chú </p>
                  <div className="mb-3">
                    <label className="form-label">Ghi chú: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ghi chú cho đơn hàng"
                      {...register("note")}
                    ></input>
                    {/* <div  className="form-text">
                We'll never share your email with anyone else.
              </div> */}
                  </div>
                  <p className="fw-bold lead">Phương thức thanh toán</p>
                  <div className="mb-3">
                    <label className="form-label">Phương thanh toán: </label>
                    <select
                      className="form-select"
                      defaultValue={"cash"}
                      {...register("paymentMethod", {
                        required: true,
                      })}
                    >
                      <option value="cash">Tiền mặt</option>
                      <option value="vnpay">VNPay</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="col-sm-12 col-lg-3  p-2 border border-2 animate__animated animate__bounceInRight">
            <div className="checkout_sticky">
              <p className="lead text-center fw-bold">Thông tin giỏ hàng</p>
              <div className="container d-flex justify-content-center flex-column text-center text-monospace mb-3">
                <p>
                  Tổng giá trị :{" "}
                  <NumberFormat
                    value={totalPrice}
                    className="text-center   "
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                    renderText={(value, props) => (
                      <span {...props}>{value}</span>
                    )}
                  />
                </p>
                <p>Tổng số sản phẩm : {totalItem}</p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={handleSubmit(SendOrder)}
                    disabled={items.length == 0 || !isLoggedIn ? true : false}
                  >
                    <i className="fas fa-gift me-2"></i> Gửi đơn hàng
                  </button>
                </div>
              </div>
              <p className="lead text-center fw-bold">Thông tin mã giảm giá</p>
              {discountCode == null && (
                <div className="container">
                  <p className="text-center">Không có thông tin mã giảm giá</p>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={handleShowDiscountModal}
                    >
                      <i className="fas fa-gift me-2"></i> Nhập mã giảm giá
                    </button>
                  </div>
                </div>
              )}
              {discountCode != null && (
                <div className="container">
                  {discountCode.discountAmount != null && (
                    <Fragment>
                      <p className="text-center">
                        Giảm giá : {discountCode.discountAmount} đ
                      </p>
                      <p className="lead text-center fw-bold">
                        Tổng giá đơn hàng sau giảm giá : 
                        <NumberFormat
                          value={totalPrice-discountCode.discountAmount}
                          className="text-center ms-1  "
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
                  {discountCode.discountPercent != null && (
                    <Fragment>
                      <p className="text-center">
                        Giảm giá : {discountCode.discountPercent} %
                      </p>
                      <p className="lead text-center fw-bold">
                        Tổng giá đơn hàng sau giảm giá : 
                        <NumberFormat
                          value={totalPrice-(discountCode.discountPercent*totalPrice)/100}
                          className="text-center  ms-1 "
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
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        backdrop="static"
        centered
        show={showLoadingModal}
        onHide={handleCloseLoadingModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đang gửi đơn hàng...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-center text-monospace mt-2">
              Đang xử lý xin chờ 1 xíu ...
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDiscountModal}
        onHide={handleCloseDiscountModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã giảm giá của bạn </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Mã giảm giá : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Nhập mã giảm giá..."
                  id="discount_code_input"
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        {isChecking && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseDiscountModal}>
            Close
          </button>
          <button
            disabled={isChecking}
            className="btn btn-success"
            onClick={ApplyDiscountCode}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Checkout;

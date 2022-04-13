import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumb } from "../BreadCrumb";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import DiscountService from "../../api/DiscountService";
import { toast } from "react-toastify";
import { formatDate } from "../../helper/formatDate";
import { Modal } from "react-bootstrap";
function Redeem() {
  const [type, setType] = useState(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState(null);
  //var
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => setShowConfirmModal(false);
  const handleShowModal = (code) => {
    setType(code);
    setShowConfirmModal(true);
  };
  function Redeem(code) {
    var dc = {
      dicountMode: code,
      userId: user.id,
    };
    setIsLoading(true);
    DiscountService.RedeemDiscountCode(dc)
      .then((res) => {
        if (res.data.success) {
          toast.success("Đổi thành công!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.log(res.data);
          var data = res.data.discountCode;
          var stringDate = res.data.discountCode.endDate + "";
          stringDate = stringDate.slice(0, stringDate.length - 6);
          data.endDate = stringDate;
          setRedeemedCode(data);
          setIsRedeemed(true);
        } else {
          toast.error("Có lỗi xảy ra! Xin hãy thử lại", {
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
        handleCloseModal();
        setIsLoading(false);
      });
  }

  if(!isLoggedIn){
    navigate("/login")
  }

  return (
    <Fragment>
      <Header></Header>
      <Breadcrumb list={[{ path: "/", name: "Home" }]} title="Mã giảm giá" />

      <div className="container w-75">
        <div className="row">
          <div className="col">
            <p className="lead">
              Tích lũy shop xu <i className="fas fa-coins me-2"></i>
              và sử dụng để mua hàng hoặc đổi mã giảm giá.
            </p>
            <p>Các mã giảm giá có thể đổi</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 10k"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 100 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Amount10K");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 20k"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 200 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Amount20K");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 50k"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 500 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Amount50K");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 10%"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 300 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Percent10");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 20%"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 400 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Percent20");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 border border-5 p-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-tags"></i>
              </span>
              <input
                type="text"
                className="form-control"
                disabled
                value={"Mã giảm giá 50%"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Shop Xu : 500 <i className="fas fa-coins"></i>
              </p>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger btn-block"
                onClick={() => {
                  handleShowModal("Percent50");
                }}
              >
                Đổi
              </button>
            </div>
          </div>
        </div>{" "}
        {isRedeemed && (
          <div className="row">
            <div className="col">
              <p className="lead">Mã giảm giá vừa đổi </p>
              <hr />
              <p>Mã : {redeemedCode.code}</p>
              <p>
                Giảm :{" "}
                {redeemedCode.discountPercent
                  ? `${redeemedCode.discountPercent} %`
                  : `${redeemedCode.discountAmount} VND`}{" "}
              </p>
              <p>
                Hết hạn sử dụng :{" "}
                {formatDate(new Date(redeemedCode.endDate + "Z"), "dd-MM-yyyy")}
              </p>
              <hr />
              <p>
                Shop đã gửi email với thông tin của mã giảm giá đến email của
                bạn.
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal show={showConfirmModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đổi mã giảm giá </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-tron text-monospace">Đổi mã giảm giá này?</p>
        </Modal.Body>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xử lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseModal}>
            Close
          </button>
          <button
            disabled={isLoading}
            className="btn btn-success"
            onClick={() => {
              Redeem(type);
            }}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
      <Footer></Footer>
    </Fragment>
  );
}

export default Redeem;

import { React, Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import ShipperService from "../../../api/ShipperService";
import { useForm } from "react-hook-form";

function CurrentOrderItem(props) {
  var item = props.item;
  var orderDate = new Date(item.orderDate + "Z");
  var shippedDate = new Date(item.shippedDate + "Z");
  //   console.log(orderDate.toLocaleString())
  //   console.log(item);
  let {
    register: registerCompleteModal,
    handleSubmit: handleSubmitCompleteModal,
    watch,
    reset: resetCompleteModal,
    formState: { errors: completeModalError },
  } = useForm();

  const [orderDetailsList, setOrderDetailsList] = useState([]);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(false);

  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = () => {
    setIsLoadingOrderDetails(true);
    setShowInfoModal(true);
    ShipperService.GetAllOrdersDetailsForOrder(item.id)
      .then((response) => {
        console.log(response.data);
        setOrderDetailsList(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingOrderDetails(false);
      });
  };

  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const handleCloseCompleteOrderModal = () => setShowCompleteOrderModal(false);
  const handleShowCompleteOrderModal = () => {
    setShowCompleteOrderModal(true);
  };

  function onComlete_CompleteOrderModal(data) {
    var user = JSON.parse(localStorage.getItem("user"));
    var dto = {
      orderID: item.id,
      shipperId: user.id,
      note: data.note,
      status: data.status,
      shippedDate: new Date().toISOString(),
    };
    setIsCompleting(true)
    ShipperService.CompleteOrder(dto).then(
      (response)=>{
        if (response.data.success) {
          toast.success("Hoàn thành giao thành công!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
      }
    )
    .catch((error)=>{
      console.log(error)
      toast.error("Có lỗi xảy ra! Xin hãy thử lại", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .finally(()=>{
      setIsCompleting(false)
      setShowCompleteOrderModal(false)
      props.reRender();
    })
  }

  var orderDetailsContent = orderDetailsList.map((od) => {
    return (
      <tr key={od.book.id}>
        <td>
          <img
            className="admin_db_button"
            src={od.book.imgUrl}
            alt="productimg"
          ></img>
        </td>
        <td>{od.book.title}</td>
        {od.promotionAmount == null && od.promotionPercent == null && (
          <td>
            <NumberFormat
              value={od.book.price}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          </td>
        )}
        {od.promotionAmount != null && (
          <td>
            <NumberFormat
              value={od.book.price}
              className="text-center text-danger text-decoration-line-through me-2"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <NumberFormat
              value={od.book.price - od.promotionAmount}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <span className="badge rounded-pill bg-danger ms-3">
              {`- ${od.promotionAmount} đ`}
            </span>
          </td>
        )}
        {od.promotionPercent != null && (
          <td>
            <NumberFormat
              value={od.book.price}
              className="text-center text-danger text-decoration-line-through me-2"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <NumberFormat
              value={
                od.book.price - (od.book.price * od.promotionPercent) / 100
              }
              className="text-center text-danger text-decoration-underline "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <span className="badge rounded-pill bg-success ms-3">
              -{od.promotionPercent}%
            </span>
          </td>
        )}

        <td>{od.quantity}</td>
        {od.promotionAmount == null && od.promotionPercent == null && (
          <td>
            <NumberFormat
              value={od.book.price * od.quantity}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          </td>
        )}
        {od.promotionAmount != null && (
          <td>
            <NumberFormat
              value={(od.book.price - od.promotionAmount) * od.quantity}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          </td>
        )}
        {od.promotionPercent != null && (
          <td>
            <NumberFormat
              value={
                (od.book.price - (od.book.price * od.promotionPercent) / 100) *
                od.quantity
              }
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          </td>
        )}
      </tr>
    );
  });

  return (
    <Fragment>
      <tr>
        <td className="text-center text-black">{item.id}</td>
        <td className="text-black">
          <p>Tên liên lạc : {item.contactName}</p>
          <p>Số điện thoại : {item.phone}</p>
          <p>Email : {item.email}</p>
          <p>Địa chỉ : {item.address}</p>
        </td>
        <td className="text-black">

<NumberFormat
  value={item.totalPrice}
  className="text-center text-danger text-decoration-underline  "
  displayType={"text"}
  thousandSeparator={true}
  suffix={"đ"}
  renderText={(value, props) => <span {...props}>{value}</span>}
/>

</td>
        <td className="text-black">
          {item.paymentMethod == "cash" && (
            <p className="text-center">Tiền mặt</p>
          )}
          {item.paymentMethod == "vnpay" && (
            <p className="text-center">VNPay</p>
          )}
        </td>
        <td>
          {item.status == 0 && (
            <span className="badge bg-info text-dark">Chưa duyệt</span>
          )}
          {item.status == 1 && (
            <span className="badge bg-success">Đã duyệt</span>
          )}
          {item.status == 2 && (
            <span className="badge bg-warning text-dark">Đang giao</span>
          )}
          {item.status == 3 && (
            <span className="badge bg-danger">Hoàn thành</span>
          )}
          {item.status == 4 && <span className="badge bg-secondary">Hủy</span>}
        </td>
        <td className="text-black">
          {formatDate(orderDate, "dd-MM-yyyy HH:mm:ss")}
        </td>
        <td className="text-black">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleShowInfoModal}
            >
              <i className="fas fa-info-circle"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowCompleteOrderModal}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
        </td>
      </tr>
      {/* order details modal */}
      <Modal centered show={showInfoModal} onHide={handleCloseInfoModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đơn hàng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoadingOrderDetails && (
            <div className="d-flex flex-column align-items-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <p className="text-center text-monospace mt-2">
                Đang xử lý xin chờ 1 xíu ...
              </p>
            </div>
          )}
          {!isLoadingOrderDetails && (
            <div className="table-responsive ">
              <p>Tổng SP : {item.totalItem}</p>
              <p>Tổng giá : {item.totalPrice}</p>
              {item.discountCode != null && (
                <Fragment>
                  <p>Mã giảm giá : {item.discountCode.code}</p>
                  {item.discountCode.discountAmount != null && (
                    <Fragment>
                      <p>Giá trị giảm : {item.discountCode.discountAmount}đ</p>
                      <p>
                        Tổng giá đơn hàng sau khi giảm :{" "}
                        {(item.totalPrice - item.discountCode.discountAmount)>0?(item.totalPrice - item.discountCode.discountAmount):0}đ
                      </p>
                    </Fragment>
                  )}
                  {item.discountCode.discountPercent != null && (
                    <Fragment>
                      <p>
                        Giá trị giảm : {item.discountCode.discountPercent} %
                      </p>
                      <p>
                        Tổng giá đơn hàng sau khi giảm :{" "}
                        {item.totalPrice -
                          (item.totalPrice *
                            item.discountCode.discountPercent) /
                            100}
                        đ
                      </p>
                    </Fragment>
                  )}
                </Fragment>
              )}
              <p>Shipper : {item.shipper.userName}</p>
         
              <table className="table">
                <thead>
                  <tr>
                    <th>SP</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Giá lẻ</th>
                  </tr>
                </thead>
                <tbody>{orderDetailsContent}</tbody>
              </table>
              <p>Ghi chú : {item.note}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showCompleteOrderModal}
        onHide={handleShowCompleteOrderModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hoàn thành giao đơn hàng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Ghi chú : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Tên..."
                  defaultValue={"Đã hoàn thành đơn hàng!"}
                  {...registerCompleteModal("note", {
                    required: true,
                  })}
                ></input>
              </div>
              <label>Trạng thái</label>
              <select
                className="form-select"
                defaultValue={3}
                {...registerCompleteModal("status", {
                    required: true,
                  })}
              >
                <option value="3">Hoàn Thành</option>
                <option value="4">Hủy</option>

              </select>
            </div>
          </form>
        </Modal.Body>
        {isCompleting && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={handleCloseCompleteOrderModal}
          >
            Close
          </button>
          <button
            disabled={isCompleting}
            className="btn btn-success"
            onClick={handleSubmitCompleteModal( onComlete_CompleteOrderModal)}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default CurrentOrderItem;

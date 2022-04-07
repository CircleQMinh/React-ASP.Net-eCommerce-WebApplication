import { React, Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import ShipperService from "../../../api/ShipperService";
function HistoryOrderItem(props) {
  var item = props.item;
  var orderDate = new Date(item.orderDate + "Z");
  var shippedDate = new Date(item.shippedDate + "Z");
  //   console.log(orderDate.toLocaleString())
  //   console.log(item);

  const [orderDetailsList, setOrderDetailsList] = useState([]);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(false);

  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = () => {
    setIsLoadingOrderDetails(true);
    setShowInfoModal(true);
    ShipperService.GetAllOrdersDetailsForOrder(item.id)
      .then((response) => {
        // console.log(response.data);
        setOrderDetailsList(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingOrderDetails(false);
      });
  };



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
        <td className="text-center text-white">
          {item.id}
        </td>
        <td className="text-white">
          <p>Tên liên lạc : {item.contactName}</p>
          <p>Số điện thoại : {item.phone}</p>
          <p>Email : {item.email}</p>
        </td>
        <td className="text-white">

<NumberFormat
  value={item.totalPrice}
  className="text-center text-danger text-decoration-underline  "
  displayType={"text"}
  thousandSeparator={true}
  suffix={"đ"}
  renderText={(value, props) => <span {...props}>{value}</span>}
/>

</td>
        <td className="text-white">
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
        <td className="text-white">
          {formatDate(orderDate, "dd-MM-yyyy HH:mm:ss")}
        </td>
        <td className="text-white">
          {formatDate(shippedDate, "dd-MM-yyyy HH:mm:ss")}
        </td>
        <td className="text-white">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleShowInfoModal}
            >
              <i className="fas fa-info-circle"></i>
            </button>

          </div>
        </td>
      </tr>
      {/* order details modal */}
      <Modal show={showInfoModal} centered onHide={handleCloseInfoModal} size="lg">
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
              <p>Ngày giao :  {formatDate(shippedDate, "dd-MM-yyyy HH:mm:ss")} </p>
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
    </Fragment>
  );
}

export default HistoryOrderItem;

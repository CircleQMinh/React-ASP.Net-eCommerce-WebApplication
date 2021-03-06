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
          toast.success("Ho??n th??nh giao th??nh c??ng!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("C?? l???i x???y ra! Xin h??y th??? l???i", {
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
      toast.error("C?? l???i x???y ra! Xin h??y th??? l???i", {
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
              suffix={"??"}
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
              suffix={"??"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <NumberFormat
              value={od.book.price - od.promotionAmount}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"??"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <span className="badge rounded-pill bg-danger ms-3">
              {`- ${od.promotionAmount} ??`}
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
              suffix={"??"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
            <NumberFormat
              value={
                od.book.price - (od.book.price * od.promotionPercent) / 100
              }
              className="text-center text-danger text-decoration-underline "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"??"}
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
              suffix={"??"}
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
              suffix={"??"}
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
              suffix={"??"}
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
          <p>T??n li??n l???c : {item.contactName}</p>
          <p>S??? ??i???n tho???i : {item.phone}</p>
          <p>Email : {item.email}</p>
          <p>?????a ch??? : {item.address}</p>
        </td>
        <td className="text-black">

<NumberFormat
  value={item.totalPrice}
  className="text-center text-danger text-decoration-underline  "
  displayType={"text"}
  thousandSeparator={true}
  suffix={"??"}
  renderText={(value, props) => <span {...props}>{value}</span>}
/>

</td>
        <td className="text-black">
          {item.paymentMethod == "cash" && (
            <p className="text-center">Ti???n m???t</p>
          )}
          {item.paymentMethod == "vnpay" && (
            <p className="text-center">VNPay</p>
          )}
        </td>
        <td>
          {item.status == 0 && (
            <span className="badge bg-info text-dark">Ch??a duy???t</span>
          )}
          {item.status == 1 && (
            <span className="badge bg-success">???? duy???t</span>
          )}
          {item.status == 2 && (
            <span className="badge bg-warning text-dark">??ang giao</span>
          )}
          {item.status == 3 && (
            <span className="badge bg-danger">Ho??n th??nh</span>
          )}
          {item.status == 4 && <span className="badge bg-secondary">H???y</span>}
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
          <Modal.Title>Th??ng tin ????n h??ng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoadingOrderDetails && (
            <div className="d-flex flex-column align-items-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <p className="text-center text-monospace mt-2">
                ??ang x??? l?? xin ch??? 1 x??u ...
              </p>
            </div>
          )}
          {!isLoadingOrderDetails && (
            <div className="table-responsive ">
              <p>T???ng SP : {item.totalItem}</p>
              <p>T???ng gi?? : {item.totalPrice}</p>
              {item.discountCode != null && (
                <Fragment>
                  <p>M?? gi???m gi?? : {item.discountCode.code}</p>
                  {item.discountCode.discountAmount != null && (
                    <Fragment>
                      <p>Gi?? tr??? gi???m : {item.discountCode.discountAmount}??</p>
                      <p>
                        T???ng gi?? ????n h??ng sau khi gi???m :{" "}
                        {(item.totalPrice - item.discountCode.discountAmount)>0?(item.totalPrice - item.discountCode.discountAmount):0}??
                      </p>
                    </Fragment>
                  )}
                  {item.discountCode.discountPercent != null && (
                    <Fragment>
                      <p>
                        Gi?? tr??? gi???m : {item.discountCode.discountPercent} %
                      </p>
                      <p>
                        T???ng gi?? ????n h??ng sau khi gi???m :{" "}
                        {item.totalPrice -
                          (item.totalPrice *
                            item.discountCode.discountPercent) /
                            100}
                        ??
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
                    <th>T??n</th>
                    <th>Gi??</th>
                    <th>S??? l?????ng</th>
                    <th>Gi?? l???</th>
                  </tr>
                </thead>
                <tbody>{orderDetailsContent}</tbody>
              </table>
              <p>Ghi ch?? : {item.note}</p>
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
          <Modal.Title>Ho??n th??nh giao ????n h??ng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Ghi ch?? : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="T??n..."
                  defaultValue={"???? ho??n th??nh ????n h??ng!"}
                  {...registerCompleteModal("note", {
                    required: true,
                  })}
                ></input>
              </div>
              <label>Tr???ng th??i</label>
              <select
                className="form-select"
                defaultValue={3}
                {...registerCompleteModal("status", {
                    required: true,
                  })}
              >
                <option value="3">Ho??n Th??nh</option>
                <option value="4">H???y</option>

              </select>
            </div>
          </form>
        </Modal.Body>
        {isCompleting && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">??ang x??? l?? xin ch??? t??...</p>
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

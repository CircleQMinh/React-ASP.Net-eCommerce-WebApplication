import { React, Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AuthService from "../../api/AuthService";
import { formatDate } from "../../helper/formatDate";
import OrderService from "../../api/OrderService";
import NumberFormat from "react-number-format";
import Pagination from "../Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
function ProfileOrder() {
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;

  const [authorizing, setAuthorizing] = useState(true);

  if (authorizing) {
    AuthService.GetAuthorizeUser(userId)
      .then((res) => {
        //console.log(res.data);
        setAuthorizing(false);
      })
      .catch((e) => {
        //console.log("Không có quyền truy cập");
        window.location.href = "/error";
      })
      .finally(() => {});
  }

  const [rerender, setRerender] = useState(true)
  const [status, setStatus] = useState("all");
  const [orderby, setOrderby] = useState("date");
  const [sort, setSort] = useState("Desc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listOrder, setListOrder] = useState([]);
  const [selectedOrder, setselectedOrder] = useState({});

  function onStatusFilterChange(event) {
    setpageNumber(1);
    setStatus(event.target.value);
  }
  function onOrderByFilterChange(event) {
    setpageNumber(1);
    setOrderby(event.target.value);
  }
  function onSortFilterChange(event) {
    setpageNumber(1);
    setSort(event.target.value);
  }
  function onPageSizeFilterChange(event) {
    setpageNumber(1);
    setPageSize(event.target.value);
  }
  function onPageNumberChange(event) {
    setpageNumber(event.target.value);
  }
  function onArrowPaginationClick(event) {
    var id = event.target.id.slice(0, 12);
    if (id == "pagination_r") {
      if (pageNumber < totalPage) {
        setpageNumber(pageNumber + 1);
      }
    } else {
      if (pageNumber > 1) {
        setpageNumber(pageNumber - 1);
      }
    }
  }
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(false);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = (order) => {
    setselectedOrder(order);
    console.log(order);
    setIsLoadingOrderDetails(true);
    setShowInfoModal(true);
    OrderService.GetAllOrdersDetailsForOrder(order.id)
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

  useEffect(() => {
    setIsLoading(true);
    fetchData()
  }, [status, orderby, sort, pageNumber, pageSize]);
  function fetchData(){
    OrderService.GetUserOrderHistory(
      userId,
      pageNumber,
      pageSize,
      status,
      orderby,
      sort
    )
      .then((res) => {
        //console.log(res.data);
        setListOrder(res.data.result);
        setTotalPage(Math.ceil(Number(res.data.totalOrder / pageSize)));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const user = JSON.parse(localStorage.getItem("user"));
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
      {!authorizing && (
        <Fragment>
          <Header></Header>
          {!isLoading && (
            <div className="background_cover_1">
              <div className="container-fluid p-0 m-0 bg-aliceblue opacity-90">
                <nav aria-label="breadcrumb" className=" breadcrumb_nav">
                  <ol className="breadcrumb mt-2 ms-2">
                    <li className="breadcrumb-item">
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <NavLink to="/">Profile</NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <p>{user.userName}</p>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <NavLink to="/">Danh sách đơn hàng</NavLink>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="container mt-2 bg-aliceblue opacity-90">
                <div className="row">
                  <div className="col col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center border_product">
                          <img
                            src={user.imgUrl}
                            alt="Admin"
                            className="rounded-circle"
                            width="150"
                          ></img>
                          <div className="container mt-3">
                            <h4>{user.userName}</h4>
                            <p className="text-secondary mb-1">
                              <strong>Email : </strong>
                              {user.email}
                            </p>
                            <p className="text-muted font-size-sm">
                              <strong>ID : </strong>
                              {user.id}
                            </p>
                            <p className="text-muted font-size-sm">
                              <strong>Shop Xu : </strong>
                              {user.coins}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mt-3">
                      <div className="container">
                        <div className="d-grid gap-2">
                          <Link
                            className="btn btn-outline-primary"
                            to={`/profile/${userId}`}
                          >
                            <i className="fas fa-receipt me-2"></i>Thông tin
                          </Link>
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-receipt me-2"></i>Đơn hàng
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              navigate("/redeem");
                            }}
                          >
                            <i className="fas fa-file-invoice-dollar me-2"></i>
                            Mã giảm giá
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              navigate("/favorite/1");
                            }}
                          >
                            <i className="far fa-heart me-2"></i>Yêu thích
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-lg-9">
                    <div className="card mb-3">
                      <div className="card-body">
                        <p className="lead">
                          Danh sách các đơn hàng
                          <i
                            className="fa-solid fa-rotate ms-2"
                            onClick={fetchData}
                          ></i>
                        </p>
                        <div className="d-flex flex-wrap justify-content-around ">
                          <div className="mb-3 row">
                            <label>Trạng thái: </label>
                            <select
                              className="form-select"
                              defaultValue={status}
                              onChange={onStatusFilterChange}
                            >
                              <option value="all">Toàn bộ</option>
                              <option value="0">Chưa duyệt</option>
                              <option value="1">Đã duyệt</option>
                              <option value="2">Đang giao</option>
                              <option value="3">Hoàn thành</option>
                              <option value="4">Hủy</option>
                            </select>
                          </div>
                          <div className="mb-3 row">
                            <label>Sắp xếp theo: </label>
                            <select
                              className="form-select"
                              defaultValue={orderby}
                              onChange={onOrderByFilterChange}
                            >
                              <option value="Id">Id</option>
                              <option value="date">Ngày đặt</option>
                              <option value="totalPrice">Tổng Giá</option>
                            </select>
                          </div>
                          <div className="mb-3 row">
                            <label>Asc/Desc: </label>
                            <select
                              className="form-select"
                              defaultValue={sort}
                              onChange={onSortFilterChange}
                            >
                              <option value="Asc">Asc</option>
                              <option value="Desc">Desc</option>
                            </select>
                          </div>
                          <div className="mb-3 row">
                            <label>Hiển thị: </label>
                            <select
                              className="form-select"
                              defaultValue={pageSize}
                              onChange={onPageSizeFilterChange}
                            >
                              <option value="5">5</option>
                              <option value="2">2</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="50">50</option>
                            </select>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Trạng thái</th>
                                <th>Ngày đặt</th>
                                <th>Tổng giá</th>
                                <th>Tổng SP</th>
                                <th>Thanh toán</th>
                                <th>Xem thông tin</th>
                              </tr>
                            </thead>

                            {!isLoading && listOrder.length > 0 && (
                              <tbody>
                                {listOrder.map((order) => {
                                  return (
                                    <tr key={order.id}>
                                      <td>{order.id}</td>
                                      <td>
                                        {order.status == 0 && (
                                          <span className="badge bg-info text-dark">
                                            Chưa duyệt
                                          </span>
                                        )}
                                        {order.status == 1 && (
                                          <span className="badge bg-success">
                                            Đã duyệt
                                          </span>
                                        )}
                                        {order.status == 2 && (
                                          <span className="badge bg-warning text-dark">
                                            Đang giao
                                          </span>
                                        )}
                                        {order.status == 3 && (
                                          <span className="badge bg-danger">
                                            Hoàn thành
                                          </span>
                                        )}
                                        {order.status == 4 && (
                                          <span className="badge bg-secondary">
                                            Hủy
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        <i className="fa-solid fa-calendar me-2"></i>
                                        {formatDate(
                                          new Date(order.orderDate + "Z"),
                                          "dd-MM-yyyy HH:mm:ss"
                                        )}
                                      </td>
                                      <td>
                                        {order.discountCode == null && (
                                          <NumberFormat
                                            value={order.totalPrice}
                                            className="text-center text-danger text-decoration-underline  "
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={"đ"}
                                            renderText={(value, props) => (
                                              <span {...props}>{value}</span>
                                            )}
                                          />
                                        )}

                                        {order.discountCode != null &&
                                          order.discountCode.discountAmount !=
                                            null && (
                                            <NumberFormat
                                              value={
                                                order.totalPrice -
                                                order.discountCode
                                                  .discountAmount
                                              }
                                              className="text-center text-danger text-decoration-underline  "
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              suffix={"đ"}
                                              renderText={(value, props) => (
                                                <span {...props}>{value}</span>
                                              )}
                                            />
                                          )}
                                        {order.discountCode != null &&
                                          order.discountCode.discountPercent !=
                                            null && (
                                            <NumberFormat
                                              value={
                                                order.totalPrice -
                                                (order.totalPrice *
                                                  order.discountCode
                                                    .discountPercent) /
                                                  100
                                              }
                                              className="text-center text-danger text-decoration-underline  "
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              suffix={"đ"}
                                              renderText={(value, props) => (
                                                <span {...props}>{value}</span>
                                              )}
                                            />
                                          )}
                                      </td>
                                      <td>{order.totalItem}</td>
                                      <td>
                                        {order.paymentMethod == "cash" && (
                                          <p className="text-center">
                                            Tiền mặt
                                          </p>
                                        )}
                                        {order.paymentMethod == "vnpay" && (
                                          <p className="text-center">VNPay</p>
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-warning"
                                          onClick={() => {
                                            handleShowInfoModal(order);
                                          }}
                                        >
                                          <i className="fas fa-info-circle"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            )}
                          </table>
                          {!isLoading && listOrder.length == 0 && (
                            <div className="d-flex justify-content-center">
                              <img
                                className="img-fluid"
                                alt="nodata"
                                src="https://ringxe.vn/static/imgs/nodata-found.png"
                              ></img>
                            </div>
                          )}
                          {isLoading && (
                            <div className="d-flex justify-content-center">
                              <div
                                className="spinner-border text-info"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <p className="text monospace ms-2">
                                Đang xử lý xin chờ tí...
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <div className="paginationsa:container">
                            <div
                              className="paginationsa:number arrow"
                              id="pagination_l"
                              onClick={onArrowPaginationClick}
                            >
                              <i
                                className="fas fa-chevron-left"
                                id="pagination_l_icon"
                              ></i>
                            </div>
                            <Pagination
                              totalPage={totalPage}
                              onPageNumberChange={onPageNumberChange}
                              pageNumber={pageNumber}
                            ></Pagination>
                            <div
                              className="paginationsa:number arrow"
                              id="pagination_r"
                              onClick={onArrowPaginationClick}
                            >
                              <i
                                className="fas fa-chevron-right"
                                id="pagination_r_icon"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className=" full_page_spinner ">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="lead text-center mt-2">
                Đang tải thông tin. Xin chờ một tí...
              </p>
            </div>
          )}
          <Footer></Footer>
        </Fragment>
      )}
      {authorizing && (
        <div className=" full_page_spinner ">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="lead text-center mt-2">
            Đang tải thông tin. Xin chờ một tí...
          </p>
        </div>
      )}

      {/* order details modal */}
      <Modal show={showInfoModal} onHide={handleCloseInfoModal} size="lg">
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
              <p>Tổng SP : {selectedOrder.totalItem}</p>
              <p>Tổng giá : {selectedOrder.totalPrice}đ</p>

              {selectedOrder.shipper != null && (
                <p>Shipper : {selectedOrder.shipper.userName}</p>
              )}
              {selectedOrder.shipper != null &&
                selectedOrder.shippedDate != "0001-01-01T00:00:00" && (
                  <Fragment>
                    <p>
                      Ngày giao :{" "}
                      {formatDate(
                        new Date(selectedOrder.shippedDate + "Z"),
                        "dd-MM-yyyy HH:mm:ss"
                      )}{" "}
                    </p>
                    <p>
                      Bạn nhận được {selectedOrder.totalPrice / 1000} shop xu từ
                      đơn hàng này.
                    </p>
                  </Fragment>
                )}
              {selectedOrder.discountCode != null && (
                <Fragment>
                  <p>Mã giảm giá : {selectedOrder.discountCode.code}</p>
                  {selectedOrder.discountCode.discountAmount != null && (
                    <Fragment>
                      <p>
                        Giá trị giảm :{" "}
                        {selectedOrder.discountCode.discountAmount}đ
                      </p>
                      <p>
                        Tổng giá đơn hàng sau khi giảm :{" "}
                        {selectedOrder.totalPrice -
                          selectedOrder.discountCode.discountAmount}
                        đ
                      </p>
                    </Fragment>
                  )}
                  {selectedOrder.discountCode.discountPercent != null && (
                    <Fragment>
                      <p>
                        Giá trị giảm :{" "}
                        {selectedOrder.discountCode.discountPercent} %
                      </p>
                      <p>
                        Tổng giá đơn hàng sau khi giảm :{" "}
                        {selectedOrder.totalPrice -
                          (selectedOrder.totalPrice *
                            selectedOrder.discountCode.discountPercent) /
                            100}
                        đ
                      </p>
                    </Fragment>
                  )}
                </Fragment>
              )}

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
              <p>Ghi chú : {selectedOrder.note}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default ProfileOrder;

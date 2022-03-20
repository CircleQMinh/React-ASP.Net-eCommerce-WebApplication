import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ShipperService from "../../../api/ShipperService";
import Pagination from "../../Pagination/Pagination";
import HistoryOrderItem from "../../Shipper/TableItem/HistoryOrderItem";

import OrderTableItem from "../TableItem/OrderTableItem";

function ShipperHistoryModal(props) {
  var shipperId = props.id;

  const [orderList, setOrderList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setpageNumber] = useState(1);
  function onPageNumberChange(event) {
    setpageNumber(event.target.value);
  }
  useEffect(() => {
   // console.log(shipperId);

    GetOrderHistory(shipperId, pageNumber);
  }, [pageNumber]);

  function handleCloseInfoModal() {
    props.close();
    setIsLoading(true);
  }

  function GetOrderHistory(id, pageNumber) {
    setIsLoading(true);
    ShipperService.getHistory(id, "shippedDate", "Desc", pageNumber, 5)
      .then((response) => {
        //console.log(response.data);
        setOrderList(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.total / 5)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Fragment>
      <Modal show={true} onHide={handleCloseInfoModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Lịch sử giao hàng </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1E1E28" }}>
          <div className="card-body text-white ">
            <div className="table-responsive ">
              <table className="table">
                <thead className="text-primary">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Thông tin liên lạc</th>
                    <th>Tổng giá</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái</th>
                    <th className="text-right">Ngày đặt</th>
                    <th className="text-right">Ngày giao</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                {!isLoading && orderList.length > 0 && (
                  <tbody>
                    {orderList.map((item, i) => {
                      return (
                        <HistoryOrderItem
                          item={item}
                          key={i}
                        ></HistoryOrderItem>
                      );
                    })}
                  </tbody>
                )}
              </table>
              {!isLoading && orderList.length == 0 && (
                <div className="d-flex justify-content-center">
                  {/* <p className="text-center text-white">
                            Không có dữ liệu
                          </p> */}
                  <img
                    className="img-fluid"
                    alt="nodata"
                    src="https://ringxe.vn/static/imgs/nodata-found.png"
                  ></img>
                </div>
              )}
              {isLoading && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text monospace ms-2">
                    Đang xử lý xin chờ tí...
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
                <div className="paginationsa:container">

                  <Pagination
                    totalPage={totalPage}
                    onPageNumberChange={onPageNumberChange}
                    pageNumber={pageNumber}
                  ></Pagination>

                </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseInfoModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ShipperHistoryModal;

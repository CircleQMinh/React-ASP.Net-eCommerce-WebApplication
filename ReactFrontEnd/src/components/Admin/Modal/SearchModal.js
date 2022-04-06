import React from "react";
import Pagination from "../../Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
import ProductTableItem from "../TableItem/ProductTableItem";
import UserTableItem from "../TableItem/UserTableItem";
import OrderTableItem from "../TableItem/OrderTableItem";
import EmployeeTableItem from "../TableItem/EmployeeTableItem";
import GenreTableItem from "../TableItem/GenreTableItem";
function SearchModal(props) {
  var data = props.searchResult;
  //console.log(data);
  var type = props.searchType;

  function onPageNumberChange(event) {
    var pageNum = event.target.value;
    props.GetSearchResult(pageNum, 4);
  }

  return (
    <Modal
      show={props.showSearchModal}
      onHide={props.handleCloseSearchModal}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Kết quả tìm kiếm </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#FFFFFF" }}>
        {props.isSearching && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2 text-white">
              Đang xử lý xin chờ tí...
            </p>
          </div>
        )}
        {!props.isSearching && type == "Product" && data.length > 0 && (
          <div className="table-responsive ">
            <table className="table">
              <thead className="text-primary">
                <tr>
                  <th className="text-center">#</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Nhà xuất bản</th>
                  <th>Tác giả</th>
                  <th>Thể loại</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <ProductTableItem
                      item={item}
                      key={i}
                      listAuthor={
                        props.listAuthor != null ? props.listAuthor : []
                      }
                      listGenre={props.listGenre != null ? props.listGenre : []}
                      listPublisher={
                        props.listPublisher != null ? props.listPublisher : []
                      }
                      reRender={props.reRender != null ? props.reRender : null}
                    ></ProductTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!props.isSearching && type == "User" && data.length > 0 && (
          <div className="table-responsive ">
            <table className="table">
              <thead className="text-primary">
                <tr>
                  <th>Thông tin</th>
                  <th>Email</th>
                  <th>SDT</th>
                  <th>Đã xác thực</th>
                  <th className="text-right">Xu</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <UserTableItem
                      item={item}
                      key={i}
                      reRender={null}
                    ></UserTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!props.isSearching && type == "Order" && data.length > 0 && (
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
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <OrderTableItem
                      item={item}
                      key={i}
                      reRender={null}
                    ></OrderTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!props.isSearching && type == "Employee" && data.length > 0 && (
          <div className="table-responsive ">
            <table className="table">
              <thead className="text-primary">
                <tr>
                  <th>Thông tin</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Liên lạc</th>
                  <th>Lương</th>
                  <th>Ngày bắt đầu</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <EmployeeTableItem
                      item={item}
                      key={i}
                      reRender={null}
                    ></EmployeeTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
            {!props.isSearching && type == "Genre" && data.length > 0 && (
          <div className="table-responsive ">
            <table className="table">
              <thead className="text-primary">
                <tr>
                  <th className="text-center">#</th>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Số sách</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <GenreTableItem
                      item={item}
                      key={i}
                      reRender={null}
                    ></GenreTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!props.isSearching && data.length == 0 && (
          <p className="text-center text-white">
            Không tìm thấy thông tin tìm kiếm!
          </p>
        )}
        {!props.isSearching && data.length != 0 && (
          <div className="d-flex justify-content-center">
            <Pagination
              totalPage={props.totalResultPage}
              onPageNumberChange={onPageNumberChange}
              pageNumber={props.currentResultPage}
            ></Pagination>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-danger"
          onClick={props.handleCloseSearchModal}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;

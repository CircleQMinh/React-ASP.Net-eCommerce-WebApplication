import React from "react";
import Pagination from "../../Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
import ProductTableItem from "../TableItem/ProductTableItem";
function SearchModal(props) {
  var data = props.searchResult;
  console.log(data);
  var type = props.searchType;
  return (
    <Modal
      show={props.showSearchModal}
      onHide={props.handleCloseSearchModal}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Kết quả tìm kiếm </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#1E1E28" }}>
        {props.isSearching && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        {!props.isSearching && type == "Product" && data.length > 0 && (
          <div className="table-responsive " >
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
                      reRender={null}
                      listAuthor={[]}
                      listGenre={[]}
                      listPublisher={[]}
                    ></ProductTableItem>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!props.isSearching && data.length == 0 && (
          <p className="text-center">Không tìm thấy thông tin tìm kiếm!</p>
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

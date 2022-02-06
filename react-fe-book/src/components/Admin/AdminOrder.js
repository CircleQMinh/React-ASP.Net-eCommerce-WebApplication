import { React, Fragment, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader";
import AdminService from "../../api/AdminService";
import OrderService from "../../api/OrderService";
import OrderTableItem from "./TableItem/OrderTableItem";
import Pagination from "../Pagination/Pagination";
function AdminOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [reRender,setReRender] = useState(true);

  const [status, setStatus] = useState("all");
  const [orderby, setOrderby] = useState("Id");
  const [sort, setSort] = useState("Asc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listOrder, setListOrder] = useState([]);
  //function
  function onStatusFilterChange(event) {
    setStatus(event.target.value);
  }
  function onOrderByFilterChange(event) {
    setOrderby(event.target.value);
  }
  function onSortFilterChange(event) {
    setSort(event.target.value);
  }
  function onPageSizeFilterChange(event) {
    setpageNumber(1);
    setPageSize(event.target.value);
  }
  function onPageNumberChange(event) {
    setpageNumber(event.target.value);
  }
  function onArrowPaginationClick(event){
    var id = event.target.id.slice(0,12)
    if(id=="pagination_r"){
      if(pageNumber<totalPage){
        setpageNumber(pageNumber+1)
      }
    }
    else{
      if(pageNumber>1){
        setpageNumber(pageNumber-1)
      }
    }
  }
  function ReRender()
  {
    setReRender(!reRender)
    console.log("a")
  }
  //run first

  useEffect(() => {
    setIsLoading(true);
    AdminService.GetOrdersForAdmin(status, orderby, sort, pageNumber, pageSize)
      .then((response) => {
        // console.log(response.data);
        setListOrder(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.totalOrder / pageSize)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [status, orderby, sort, pageNumber, pageSize,reRender]);

  return (
    <Fragment>
      <AdminHeader></AdminHeader>

      <div className="w-100 h-100" style={{ backgroundColor: "#1E1E28" }}>
        <div className="container  py-3 ">
          <div className="card p-3">
            <p className="lead text-center mb-0 fw-bold fs-3 text-monospace">
              {" "}
              <i className="fas fa-file-invoice-dollar me-2"></i>Quản lý đơn
              hàng
            </p>
          </div>
          <div className="row">
            <div className="col">
              <div
                className="div-center-content mt-3"
                style={{ marginTop: -25 + "px", marginBottom: 15 + "px" }}
                id="searchBarProduct"
              >
                <div className="w-100 my-2">
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Tìm kiếm..."
                    ></input>
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-white fw-bold fs-5">
                    Tìm kiếm bằng :{" "}
                  </label>
                  <select className="form-select" defaultValue={"Id"}>
                    <option value="Id">Id</option>
                    <option value="Price">Giá</option>
                    <option value="Name">Tên</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <hr className="text-white"></hr>
            <div className="d-flex flex-wrap justify-content-around ">
              <div className="mb-3 row">
                <label className="text-white">Trạng thái: </label>
                <select
                  className="form-select"
                  defaultValue={"all"}
                  onChange={onStatusFilterChange}
                >
                  <option value="all">Toàn bộ</option>
                  <option value="0">Chưa duyệt</option>
                  <option value="1">Đã duyệt</option>
                  <option value="2">Đang giao</option>
                  <option value="3">Hoàn thành</option>
                </select>
              </div>
              <div className="mb-3 row">
                <label className="text-white">Sắp xếp theo: </label>
                <select
                  className="form-select"
                  defaultValue={"Id"}
                  onChange={onOrderByFilterChange}
                >
                  <option value="Id">Id</option>
                  <option value="totalPrice">Tổng giá</option>
                  <option value="contactName">Tên</option>
                </select>
              </div>
              <div className="mb-3 row">
                <label className="text-white">Asc/Desc: </label>
                <select
                  className="form-select"
                  defaultValue={"Asc"}
                  onChange={onSortFilterChange}
                >
                  <option value="Asc">Asc</option>
                  <option value="Desc">Desc</option>
                </select>
              </div>
              <div className="mb-3 row">
                <label className="text-white">Hiển thị: </label>
                <select
                  className="form-select"
                  defaultValue={"5"}
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
            <hr className="text-white"></hr>
            <div className="container">
              <div className="card bg-admin text-white">
                <div className="card-header">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="col-sm-12 ">
                      <h5 className="card-title">Bảng quản lý đơn hàng</h5>
                    </div>
                    <div className="col-sm-12 ">
                      <div className="btn-group mb-2">
                        <button type="button" className="btn btn-danger">
                          <i className="fas fa-plus"></i>
                        </button>
                        <button type="button" className="btn btn-warning">
                          <i className="fas fa-sync"></i>
                        </button>
                        <button type="button" className="btn btn-success">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body text-white">
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
                      {!isLoading && listOrder.length > 0 && (
                        <tbody>
                          {listOrder.map((item, i) => {
                            return (
                              <OrderTableItem
                                item={item}
                                key={i}
                                reRender={ReRender}
                              ></OrderTableItem>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                    {!isLoading && listOrder.length == 0 && (
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
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <div className="paginationsa:container">
              <div className="paginationsa:number arrow" id="pagination_l" onClick={onArrowPaginationClick}>
                <i className="fas fa-chevron-left" id="pagination_l_icon"></i>
              </div>
              <Pagination
                totalPage={totalPage}
                onPageNumberChange={onPageNumberChange}
                pageNumber={pageNumber}
              ></Pagination>
              <div className="paginationsa:number arrow" id="pagination_r" onClick={onArrowPaginationClick}>
                <i className="fas fa-chevron-right" id="pagination_r_icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default AdminOrder;

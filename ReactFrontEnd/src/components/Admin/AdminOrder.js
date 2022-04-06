import { React, Fragment, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader";
import AdminService from "../../api/AdminService";
import AuthService from "../../api/AuthService";
import OrderService from "../../api/OrderService";
import OrderTableItem from "./TableItem/OrderTableItem";
import Pagination from "../Pagination/Pagination";
import SearchModal from "./Modal/SearchModal";
import { formatDate } from "../../helper/formatDate";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth_action } from "../../redux/auth_slice.js";
import AdminLoading from "./AdminLoading";
import { bg_admin } from "./../../contant";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function AdminOrder() {
  const [authorizing, setAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);
  var navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);
  const [isExportPDF, setIsExportPDF] = useState(false);
  useEffect(() => {
    AuthService.GetAuthorizeAdmin()
      .then((res) => {
        //console.log(res.data);
        setAuthorizing(false);
      })
      .catch((e) => {
        toast.success("Xác thực không thành công! Xin hãy đăng nhập trước", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          dispatch(auth_action.logOut());
          navigate("/login");
        }, 2500);
      })
      .finally(() => {});
  }, [reRender]);

  const [status, setStatus] = useState("0");
  const [orderby, setOrderby] = useState("orderDate");
  const [sort, setSort] = useState("Desc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listOrder, setListOrder] = useState([]);
  //function
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
  function ReRender() {
    setReRender(!reRender);
  }

  const [searchType, setSearchType] = useState("Order");
  const [searchBy, setSearchBy] = useState("Id");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentResultPage, setCurrentResultPage] = useState(1);
  const [totalResultPage, setTotalResultPage] = useState(1);
  function onSearchTypeChange(event) {
    setSearchType(event.target.value);
  }
  function onSearchByChange(event) {
    setSearchBy(event.target.value);
  }
  function onKeywordChange(event) {
    setKeyword(event.target.value);
  }
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isSearching, setIsSearching] = useState(true);

  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  };
  const handleShowSearchModal = () => {
    setShowSearchModal(true);
    setIsSearching(true);
    GetSearchResult(1, 4);
  };
  function GetSearchResult(pageNumber, pageSize) {
    setCurrentResultPage(pageNumber);
    var tempKeyword = keyword;
    if (searchBy == "OrderDate" || searchBy == "ShippedDate") {
      try {
        var date = new Date(keyword);
        //console.log(formatDate(date,"yyyy-MM-dd"))
        tempKeyword = formatDate(date, "yyyy-MM-dd");
      } catch (e) {
        toast.error("Ngày nhập không hợp lệ!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    AdminService.GetSearchResult(
      searchType,
      searchBy,
      tempKeyword,
      pageNumber,
      pageSize
    )
      .then((res) => {
        console.log(res.data);
        setTotalResultPage(Math.ceil(Number(res.data.total / pageSize)));
        setSearchResult(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleShowSearchModal();
    }
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
  }, [status, orderby, sort, pageNumber, pageSize, reRender]);

  function ExportPDF() {
    setIsExportPDF(true);
    setTimeout(() => {
      const input = document.getElementById("data_table");
      var positionInfo = input.getBoundingClientRect();
      const pdf = new jsPDF("l", "mm", "a4");

      var canvas = document.createElement("canvas");
      canvas.width = positionInfo.width * 4;
      canvas.height = positionInfo.width * 4;
      canvas.style.width = positionInfo.width + "px";
      canvas.style.height = positionInfo.height + "px";
      var context = canvas.getContext("2d");
      context.scale(4, 4);
      const title = document.getElementById("title_pdf");
      html2canvas(title).then((canvas) => {
        var imgWidth = 295;
        var pageHeight = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var position = 0;
        const imgData = canvas.toDataURL("image/png", 4);
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      });
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 4);
        var imgWidth = 295;
        var pageHeight = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var position = 0;

        pdf.addImage(imgData, "PNG", 0, 20, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("download.pdf");
      });
      setIsExportPDF(false);
    }, 2000);
  }

  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <AdminHeader></AdminHeader>

          <div className="w-100 h-100" style={{ backgroundColor: bg_admin }}>
            <div className="container  py-3 ">
              <div className="card p-3" id="title_pdf">
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
                          onKeyDown={handleKeyDown}
                          onChange={onKeywordChange}
                          type="text"
                          className="searchTerm"
                          placeholder="Tìm kiếm..."
                        ></input>
                        <button
                          type="submit"
                          className="searchButton"
                          onClick={handleShowSearchModal}
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-black fw-bold fs-5">
                        Tìm kiếm bằng :{" "}
                      </label>
                      <select
                        className="form-select"
                        defaultValue={"Id"}
                        onChange={onSearchByChange}
                      >
                        <option value="Id">Id</option>
                        <option value="TotalPrice">Giá</option>
                        <option value="Name">Tên</option>
                        <option value="OrderDate">Ngày đặt</option>
                        <option value="ShippedDate">Ngày giao</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr className="text-black"></hr>
                <div className="d-flex flex-wrap justify-content-around ">
                  <div className="mb-3 row">
                    <label className="text-black">Trạng thái: </label>
                    <select
                      className="form-select"
                      defaultValue={"0"}
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
                    <label className="text-black">Sắp xếp theo: </label>
                    <select
                      className="form-select"
                      defaultValue={"Id"}
                      onChange={onOrderByFilterChange}
                    >
                      <option value="Id">Id</option>
                      <option value="totalPrice">Tổng giá</option>
                      <option value="contactName">Tên</option>
                      <option value="orderDate">Ngày đặt</option>
                      <option value="shippedDate">Ngày giao</option>
                    </select>
                  </div>
                  <div className="mb-3 row">
                    <label className="text-black">Asc/Desc: </label>
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
                    <label className="text-black">Hiển thị: </label>
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
                      <option value="9999">Toàn bộ</option>
                    </select>
                  </div>
                </div>
                <hr className="text-black"></hr>
                <div className="container">
                  <div className="card bg-admin text-black">
                    <div className="card-header">
                      <div className="d-flex justify-content-between flex-wrap">
                        <div className="col-sm-12 ">
                          <h5 className="card-title">Bảng quản lý đơn hàng</h5>
                        </div>
                        <div className="col-sm-12 ">
                          <div className="btn-group mb-2">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={ReRender}
                            >
                              <i className="fas fa-sync"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={ExportPDF}
                            >
                              <i className="fas fa-download me-2"></i>
                              Tải PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body text-black" id="data_table">
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
                              {!isExportPDF && (
                                <th className="text-right">Actions</th>
                              )}
                            </tr>
                          </thead>
                          {!isLoading && listOrder.length > 0 && (
                            <tbody>
                              {listOrder.map((item, i) => {
                                return (
                                  <OrderTableItem
                                    isExportPDF={isExportPDF}
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
                            {/* <p className="text-center text-black">
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
                    </div>
                  </div>
                </div>
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
          <Footer></Footer>
        </Fragment>
      )}
      {authorizing && <AdminLoading></AdminLoading>}
      <SearchModal
        showSearchModal={showSearchModal}
        handleCloseSearchModal={handleCloseSearchModal}
        isSearching={isSearching}
        searchResult={searchResult}
        searchType={searchType}
        GetSearchResult={GetSearchResult}
        currentResultPage={currentResultPage}
        totalResultPage={totalResultPage}
      ></SearchModal>
    </Fragment>
  );
}

export default AdminOrder;

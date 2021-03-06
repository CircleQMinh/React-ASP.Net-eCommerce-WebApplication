import { React, Fragment, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader";
import AdminService from "../../api/AdminService";
import AuthService from "../../api/AuthService";
import UserTableItem from "./TableItem/UserTableItem";
import Pagination from "../Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DiscountTableItem from "./TableItem/DiscountTableItem";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth_action } from "../../redux/auth_slice.js";
import AdminLoading from "./AdminLoading";
import AddRandomDCModal from "./Modal/AddRandomDCModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {bg_admin} from "./../../contant"
import { formatDate } from "../../helper/formatDate";
function AdminDiscount() {
  const [authorizing, setAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);
  var navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  let {
    register: registerAddModal,
    handleSubmit: handleSubmitAddModal,
    watch,
    reset: resetAddModal,
    formState: { errors: addModalError },
  } = useForm();

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetAddModal();
    setCode("");
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
    resetAddModal();
    setCode("");
  };

  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("Desc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listDCode, setListDCode] = useState([]);

  //function
  function onStatusFilterChange(event) {
    setpageNumber(1);
    setStatus(event.target.value);
  }
  function onTypeFilterChange(event) {
    setpageNumber(1);
    setType(event.target.value);
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

  function onAddButtonClick(data) {
    if (data.type == "amount") {
      if (data.value < 1000) {
        toast.error("Giá trị giảm giá phải ít nhất là 1000VND!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    } else {
      if (data.value < 10) {
        toast.error("Giá trị giảm giá ít nhất là 10%!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      if (data.value > 99) {
        toast.error("Giá trị giảm giá tối đa là 99%!", {
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
    //console.log(data);
    var newDC = {
      code: data.code,
      discountPercent: data.type == "percent" ? data.value : null,
      discountAmount: data.type == "amount" ? data.value : null,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: 0,
    };
    console.log(newDC);
    setIsAdding(true);
    AdminService.PostDiscountCode(newDC)
      .then((res) => {
        if (res.data.success) {
          toast.success("Thêm thành công!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(res.data.error, {
            position: "top-center",
            autoClose: 2000,
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
        setIsAdding(false);
        ReRender();
        resetAddModal();
        setShowAddModal(false);
      });
  }
  const [code, setCode] = useState("");

  function upperCaseMyText(event) {
    setCode(event.target.value.toUpperCase());
  }
  var today = new Date();
  var minDay = "";
  var maxDay = "";
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  minDay = yyyy + "-" + mm + "-" + dd;
  dd = today.getDate() + 1;
  maxDay = yyyy + "-" + mm + "-" + dd;
  //run first

  useEffect(() => {
    setIsLoading(true);
    AdminService.GetDiscountCodeForAdmin(status, type, pageNumber, pageSize)
      .then((response) => {
        // console.log(response.data);
        setListDCode(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.total / pageSize)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [status, type, sort, pageNumber, pageSize, reRender]);

  const [showAddRandomDCModal, setShowAddRandomDCModal] = useState(false);
  const handleShowAddRandomDCModal = () => {
    setShowAddRandomDCModal(true);
  };
  const handleCloseAddRandomDCModal = () => {
    setShowAddRandomDCModal(false);
  };

  const [isExportPDF, setIsExportPDF] = useState(false);

  function ExportPDF() {
    setIsExportPDF(true);
    setTimeout(() => {
      const input = document.getElementById("data_table");
      var positionInfo = input.getBoundingClientRect();
      const pdf = new jsPDF("l","mm","a4",);

      var canvas = document.createElement('canvas');
      canvas.width = positionInfo.width*4;
      canvas.height = positionInfo.width*4;
      canvas.style.width = positionInfo.width + 'px';
      canvas.style.height = positionInfo.height + 'px';
      var context = canvas.getContext('2d');
      context.scale(4,4);
      const title = document.getElementById("title_pdf");
      html2canvas(title).then((canvas) => {
        var imgWidth = 295; 
        var pageHeight = 210;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        var position = 0;
        const imgData = canvas.toDataURL("image/png",4);
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      });
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png",4);
        var imgWidth = 295; 
        var pageHeight = 210;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        var position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("download.pdf");
      });
      setIsExportPDF(false);
    }, 2000);
  }

  const camelCase = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };
  const filterColumns = (data) => {
    // Get column names
    const columns = Object.keys(data[0]);
    let headers = [];
    columns.forEach((col, idx) => {
      headers.push({ label: camelCase(col), key: col });
    });

    return headers;
  };
  function ExportCSV(){
    var data=[]
    //console.log(listDCode)
    listDCode.forEach(item => {
      var temp = {
        id:item.id,
        code:item.code,
        value:item.discountAmount?item.discountAmount+"đ":item.discountPercent+"%",
        status:item.status==0?"Chưa sử dụng":"Đã sử dụng",
        startDate:formatDate(
          new Date(item.startDate + "Z"),
          "dd-MM-yyyy HH:mm:ss"
        ),
        endDate:formatDate(
          new Date(item.endDate + "Z"),
          "dd-MM-yyyy HH:mm:ss"
        )

      }
      data.push(temp)
    });

    localStorage.setItem("exportCSVData",JSON.stringify(data))
    localStorage.setItem("exportCSVHeader",JSON.stringify(filterColumns(data)))
    window.open("/exportCSV", "_blank") //to open new page
  }
  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <AdminHeader></AdminHeader>

          <div className="w-100 h-100" style={{ backgroundColor: bg_admin}}>
            <div className="container  py-3 ">
            <div className="card p-3 " id="title_pdf">
                <p className="lead text-center mb-0 fw-bold fs-3 text-monospace">
                  {" "}
                  <i className="fas fa-file-invoice-dollar me-2"></i>Quản lý mã
                  giảm giá
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
                      <label className="text-black fw-bold fs-5">
                        Tìm kiếm bằng :{" "}
                      </label>
                      <select className="form-select" defaultValue={"Id"}>
                        <option value="Id">Id</option>
                        <option value="Price">Giá</option>
                        <option value="Name">Tên</option>
                        <option value="orderDate">Ngày đặt</option>
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
                      defaultValue={"all"}
                      onChange={onStatusFilterChange}
                    >
                      <option value="all">Toàn bộ</option>
                      <option value="0">Chưa sử dụng</option>
                      <option value="1">Đã sử dụng</option>
                    </select>
                  </div>
                  <div className="mb-3 row">
                    <label className="text-black">Loại mã : </label>
                    <select
                      className="form-select"
                      defaultValue={"Id"}
                      onChange={onTypeFilterChange}
                    >
                      <option value="all">Toàn bộ</option>
                      <option value="percent">Theo %</option>
                      <option value="amount">Theo VND</option>
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
                          <h5 className="card-title">
                            Bảng quản lý mã giảm giá
                          </h5>
                        </div>
                        <div className="col-sm-12 ">
                          <div className="btn-group mb-2">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleShowAddModal}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={handleShowAddRandomDCModal}
                            >
                              <i className="fa-solid fa-circle-plus"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={ReRender}
                            >
                              <i className="fas fa-sync"></i>
                            </button>
                            <button type="button" className="btn btn-success" onClick={ExportPDF}>
                              <i className="fas fa-download me-2"></i>Tải PDF
                            </button>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={ExportCSV}
                            >
                              <i className="fas fa-download me-2"></i>
                              Tải Excel
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
                              <th>Thông tin</th>
                              <th>Giá trị </th>
                              <th>Trạng thái</th>
                              <th>Có hiệu lực</th>
                              <th>Hạn sử dụng</th>
                              {!isExportPDF && (
                                <th className="text-right">Actions</th>
                              )}
                            </tr>
                          </thead>
                          {!isLoading && listDCode.length > 0 && (
                            <tbody>
                              {listDCode.map((item, i) => {
                                return (
                                  <DiscountTableItem
                                  isExportPDF={isExportPDF}
                                    item={item}
                                    key={i}
                                    reRender={ReRender}
                                  ></DiscountTableItem>
                                );
                              })}
                            </tbody>
                          )}
                        </table>
                        {!isLoading && listDCode.length == 0 && (
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
      {/* add  modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm mã giảm giá </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Mã giảm giá : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Mã giảm giá..."
                  {...registerAddModal("code", {
                    required: true,
                    minLength: 8,
                  })}
                  value={code}
                  onChange={upperCaseMyText}
                ></input>
              </div>
              {addModalError.code?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Mã giảm giá
                  không để trống
                </p>
              )}
              {addModalError.code?.type === "minLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Mã giảm giá
                  phải đủ 8 kí tự
                </p>
              )}
              <label>Loại giảm giá</label>
              <select
                className="form-select"
                {...registerAddModal("type", {
                  required: true,
                })}
              >
                <option value="amount">Theo VND</option>
                <option value="percent">Theo %</option>
              </select>
              <label>Giá trị giảm giá : </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Giá trị giảm giá..."
                  {...registerAddModal("value", {
                    required: true,
                    valueAsNumber: true,
                  })}
                ></input>
              </div>
              {addModalError.value?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Giá trị giảm
                  giá không hợp lệ
                </p>
              )}
              {addModalError.value?.type === "valueAsNumber" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Giá trị giảm
                  giá không hợp lệ
                </p>
              )}

              <label>Ngày bắt đầu : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Ngày bắt đầu.."
                  type="date"
                  min={minDay}
                  {...registerAddModal("startDate", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.startDate?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Ngày bắt đầu
                  không để trống
                </p>
              )}
              <label>Ngày kết thúc : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Ngày bắt đầu.."
                  type="date"
                  min={maxDay}
                  {...registerAddModal("endDate", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.endDate?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Ngày kết thúc
                  không để trống
                </p>
              )}
            </div>
          </form>
        </Modal.Body>
        {isAdding && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseAddModal}>
            Close
          </button>
          <button
            disabled={isAdding}
            className="btn btn-success"
            onClick={handleSubmitAddModal(onAddButtonClick)}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      {/* add random dc modal */}
      {showAddRandomDCModal && (
        <AddRandomDCModal
          close={handleCloseAddRandomDCModal}
          reRender={ReRender}
          maxDay={maxDay}
          minDay={minDay}
          upperCaseMyText={upperCaseMyText}
        ></AddRandomDCModal>
      )}
    </Fragment>
  );
}

export default AdminDiscount;

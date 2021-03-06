import { React, Fragment, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader";
import AdminService from "../../api/AdminService";
import AuthService from "../../api/AuthService";
import Pagination from "../Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EmployeeTableItem from "./TableItem/EmployeeTableItem";
import SearchModal from "./Modal/SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth_action } from "../../redux/auth_slice.js";
import AdminLoading from "./AdminLoading";
import AddEmployeeModal from "./Modal/AddEmployeeModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {bg_admin} from "./../../contant"
import { formatDate } from "../../helper/formatDate";
function AdminEmp() {
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

  const [selectedImgUrl, setselectedImgUrl] = useState(null);
  const defaultImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";
  function onImageChange(event) {
    //setselectedImgUrl(event.target.value)
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      alert("Bạn phải chọn 1 hình ảnh");
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("File phải là hình ảnh");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      // console.log(reader.result)
      setselectedImgUrl(reader.result);
    };
  }
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
    setselectedImgUrl(null);
    resetAddModal();
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const [role, setRole] = useState("all");
  const [orderby, setOrderby] = useState("Id");
  const [sort, setSort] = useState("Asc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listEmp, setListEmp] = useState([]);
  //function
  function onRoleFilterChange(event) {
    setpageNumber(1);
    setRole(event.target.value);
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

  function onAddButtonClick(data) {}
  //run first

  useEffect(() => {
    setIsLoading(true);
    AdminService.GetEmpForAdmin(role, orderby, sort, pageNumber, pageSize)
      .then((response) => {
        //console.log(response.data);
        setListEmp(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.total / pageSize)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderby, sort, pageNumber, pageSize, reRender]);

  const [searchType, setSearchType] = useState("Employee");
  const [searchBy, setSearchBy] = useState("Name");
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
    AdminService.GetSearchResult(
      searchType,
      searchBy,
      keyword,
      pageNumber,
      pageSize
    )
      .then((res) => {
        //console.log(res.data);
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
    //console.log(listEmp)
    listEmp.forEach(item => {
      var temp = {
        id:item.id,
        name:item.name,
        role:item.shipperId?"Shipper":"Staff",
        dob:item.doB,
        sex:item.sex,
        email:item.email,
        address:item.address,
        cmnd:item.cmnd,
        salary:item.salary,
        startDate:formatDate(new Date(item.startDate + "Z")),
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
                  <i className="fas fa-file-invoice-dollar me-2"></i>Quản lý
                  nhân viên
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
                          onKeyDown={handleKeyDown}
                          onChange={onKeywordChange}
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
                      <select className="form-select" defaultValue={"Name"}>
                        <option value="Id">Id</option>
                        <option value="Name">Tên</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr className="text-black"></hr>
                <div className="d-flex flex-wrap justify-content-around ">
                  <div className="mb-3 row">
                    <label className="text-black">Loại nhân viên: </label>
                    <select
                      className="form-select"
                      defaultValue={"all"}
                      onChange={onRoleFilterChange}
                    >
                      <option value="all">Toàn bộ</option>
                      <option value="shipper">Shipper</option>
                      <option value="employee">Nhân Viên</option>
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
                      <option value="Name">Tên</option>
                      <option value="Email">Email</option>
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
                          <h5 className="card-title">Bảng quản lý nhân viên</h5>
                        </div>
                        <div className="col-sm-12 ">
                          <div className="btn-group mb-2">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleShowAddModal}
                            >
                              <i className="fa-solid fa-plus"></i>
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
                              <th>Ngày sinh</th>
                              <th>Giới tính</th>
                              <th>Liên lạc</th>
                              <th>Lương</th>
                              <th>Ngày bắt đầu</th>
                              {!isExportPDF && (
                                <th className="text-right">Actions</th>
                              )}
                            </tr>
                          </thead>
                          {!isLoading && listEmp.length > 0 && (
                            <tbody>
                              {listEmp.map((item, i) => {
                                return (
                                  <EmployeeTableItem
                                  isExportPDF={isExportPDF}
                                    item={item}
                                    key={i}
                                    reRender={ReRender}
                                  ></EmployeeTableItem>
                                );
                              })}
                            </tbody>
                          )}
                        </table>
                        {!isLoading && listEmp.length == 0 && (
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
      {/* add modal */}
      <AddEmployeeModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        reRender={ReRender}
      ></AddEmployeeModal>


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

export default AdminEmp;

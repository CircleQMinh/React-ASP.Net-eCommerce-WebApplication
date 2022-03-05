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
function AdminUser() {
  const [authorizing, setAuthorizing] = useState(true);

  if (authorizing) {
    AuthService.GetAuthorizeAdmin()
      .then((res) => {
        //console.log(res.data);
        setAuthorizing(false);
      })
      .catch((e) => {
        //console.log("Không có quyền truy cập");
        window.location.href = "/login";
      })
      .finally(() => {});
  }

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
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);

  const [orderby, setOrderby] = useState("orderDate");
  const [sort, setSort] = useState("Desc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [listUser, setListUser] = useState([]);
  //function
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

  function onAddButtonClick(data) {
    var newUser = {
      email: data.email,
      password: data.password,
      imgUrl: selectedImgUrl ? selectedImgUrl : defaultImgUrl,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      roles: ["User"],
    };
    console.log(newUser);
    setIsAdding(true);
    AdminService.AddUserForAdmin(newUser)
      .then((res) => {
        if (res.data.success) {
          toast.success("Thêm thành công!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("Có lỗi xảy ra! Xin hãy thử lại", {
            position: "top-center",
            autoClose: 1000,
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
        resetAddModal()
        setselectedImgUrl(null)
        setShowAddModal(false);
      });
  }
  //run first

  useEffect(() => {
    setIsLoading(true);
    AdminService.GetUserForAdmin(orderby, sort, pageNumber, pageSize)
      .then((response) => {
        //console.log(response.data);
        setListUser(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.total / pageSize)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderby, sort, pageNumber, pageSize, reRender]);

  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <AdminHeader></AdminHeader>

          <div className="w-100 h-100" style={{ backgroundColor: "#1E1E28" }}>
            <div className="container  py-3 ">
              <div className="card p-3">
                <p className="lead text-center mb-0 fw-bold fs-3 text-monospace">
                  {" "}
                  <i className="fas fa-file-invoice-dollar me-2"></i>Quản lý
                  người dùng
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
                        <option value="orderDate">Ngày đặt</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr className="text-white"></hr>
                <div className="d-flex flex-wrap justify-content-around ">
                  <div className="mb-3 row">
                    <label className="text-white">Sắp xếp theo: </label>
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
                          <h5 className="card-title">
                            Bảng quản lý người dùng
                          </h5>
                        </div>
                        <div className="col-sm-12 ">
                          <div className="btn-group mb-2">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleShowAddModal}
                            ><i className="fas fa-plus"></i></button>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={ReRender}
                            >
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
                              <th>Thông tin</th>
                              <th>Email</th>
                              <th>SDT</th>
                              <th>Đã xác thực</th>
                              <th className="text-right">Xu</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          {!isLoading && listUser.length > 0 && (
                            <tbody>
                              {listUser.map((item, i) => {
                                return (
                                  <UserTableItem
                                    item={item}
                                    key={i}
                                    reRender={ReRender}
                                  ></UserTableItem>
                                );
                              })}
                            </tbody>
                          )}
                        </table>
                        {!isLoading && listUser.length == 0 && (
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

      {/* add product modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Tên người dùng : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Tên..."
                  {...registerAddModal("userName", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.userName?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Tên người dùng
                  không để trống
                </p>
              )}
              <label>Password : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Password.."
                  type="password"
                  {...registerAddModal("password", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.password?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Password không
                  để trống
                </p>
              )}
              <label>Email : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Email.."
                  type="email"
                  {...registerAddModal("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                ></input>
              </div>
              {addModalError.email?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email không để
                  trống
                </p>
              )}
              {addModalError.email?.type === "pattern" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email không hợp
                  lệ
                </p>
              )}
              <label>SDT : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Password.."
                  type="tel"
                  {...registerAddModal("phoneNumber", {
                    required: true,
                    minLength: 9,
                    maxLength: 10,
                  })}
                ></input>
              </div>
              {addModalError.phoneNumber?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không để
                  trống
                </p>
              )}
              {addModalError.phoneNumber?.type === "minLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không hợp
                  lệ
                </p>
              )}
              {addModalError.phoneNumber?.type === "maxLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không hợp
                  lệ
                </p>
              )}
              <label>Ảnh SP</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Ảnh"
                  onChange={onImageChange}
                ></input>
              </div>
              <img
                className="admin_img_modal"
                alt="Ảnh sản phẩm"
                src={selectedImgUrl ? selectedImgUrl : defaultImgUrl}
              ></img>
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
    </Fragment>
  );
}

export default AdminUser;

import { React, Fragment, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./Admin.css";
import AdminHeader from "./AdminHeader";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminService from "../../api/AdminService";
import { toast } from "react-toastify";
import SearchModal from "./Modal/SearchModal";
import AdminLoading from "./AdminLoading";
import AdminStatistic from "./AdminStatistic";

function Dashboard(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reRender, setReRender] = useState(true);
  const [authorizing, setAuthorizing] = useState(true);

  const [dashboardInfo, setDashboardInfo] = useState({
    orderCount: 0,
    productCount: 0,
    uncheckOrderCount: 0,
    userCount: 0,
  });

  const [searchType, setSearchType] = useState("Product");
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
    if (searchType == "User") {
      AdminService.GetSearchResult_User(searchBy, keyword, pageNumber, pageSize)
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
    } else {
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
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleShowSearchModal();
    }
  }
  useEffect(() => {
    AuthService.GetAuthorizeAdmin()
      .then((res) => {
        //console.log(res.data);
        LoadDashboardInfo().then(() => {
          setAuthorizing(false);
        });
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


  function ReRender() {
    setReRender(!reRender);
  }

  async function LoadDashboardInfo() {

    AdminService.GetDashboardInfo()
      .then((res) => {
        //console.log(res.data);
        var data = res.data;
        var info = {
          orderCount: data.orderCount,
          productCount: data.productCount,
          uncheckOrderCount: data.uncheckOrderCount,
          userCount: data.userCount,
        };
        localStorage.setItem("orderCount",data.uncheckOrderCount)
        setDashboardInfo(info);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});


  }

  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <AdminHeader></AdminHeader>
          <div className="w-100 h-100" style={{ backgroundColor: "#1E1E28" }}>
            <div className="container  py-3 ">
              <div className="row">
                <div className="col">
                  <div
                    className="div-center-content mt-3"
                    style={{ marginTop: -25 + "px", marginBottom: 15 + "px" }}
                    id="searchBarProduct"
                  >
                    <div className="form-group">
                      <label className="text-white fw-bold fs-3">
                        Tìm kiếm :{" "}
                      </label>
                      <select
                        className="form-select"
                        defaultValue={"Product"}
                        onChange={onSearchTypeChange}
                      >
                        <option value="Product">Sản phẩm</option>
                        <option value="User">Người dùng</option>
                        <option value="Order">Đơn hàng</option>
                        <option value="Employee">Nhân viên</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="text-white fw-bold fs-5">
                        Tìm kiếm bằng :{" "}
                      </label>
                      <select
                        className="form-select"
                        defaultValue={"Name"}
                        onChange={onSearchByChange}
                      >
                        <option value="Id">Id</option>
                        <option value="Name">Tên</option>
                      </select>
                    </div>
                    <div className="w-100 my-2">
                      <div className="search">
                        <input
                          type="text"
                          className="searchTerm"
                          onKeyDown={handleKeyDown}
                          onChange={onKeywordChange}
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
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Tổng số sản phẩm</label>
                        </div>
                        <h4 className="font-weight-normal">
                          {dashboardInfo.productCount}
                        </h4>{" "}
                        <small>
                          <Link
                            to={"/admin/product"}
                            className="btn btn-primary"
                          >
                            Đến quản lý sản phẩm{" "}
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-book admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">
                            Đơn hàng chưa duyệt
                          </label>
                        </div>
                        <h4 className="font-weight-normal">
                          {dashboardInfo.uncheckOrderCount}
                        </h4>{" "}
                        <small>
                          <Link to={"/admin/order"} className="btn btn-success">
                            Đến quản lý đơn hàng
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-file-invoice admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">
                            Tổng số người dùng
                          </label>
                        </div>
                        <h4 className="font-weight-normal">
                          {dashboardInfo.userCount}
                        </h4>{" "}
                        <small>
                          <Link to={"/admin/user"} className="btn btn-warning">
                            Đến quản lý user
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fas fa-user admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">
                            Xem chi tiết thống kê
                          </label>
                        </div>
                        <h4 className="font-weight-normal">
                          Thống kê chi tiết
                        </h4>{" "}
                        <small>
                          <Link
                            to={"/admin/statistic"}
                            className="btn btn-danger"
                          >
                            Xem thông kê
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-chart-line admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <AdminStatistic>

              </AdminStatistic>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      )}
      {authorizing && (
        <AdminLoading></AdminLoading>
      )}
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

export default Dashboard;

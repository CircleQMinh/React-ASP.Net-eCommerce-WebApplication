import { React, Fragment, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./Admin.css";
import AdminHeader from "./AdminHeader";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SaleChart from "./Chart/SaleChart";
import { formatDate } from "../../helper/formatDate";
import AdminService from "../../api/AdminService";
import { toast } from "react-toastify";
import OrderChart from "./Chart/OrderChart";
import TopProductChart from "./Chart/TopProductChart";
import SearchModal from "./Modal/SearchModal";

function Dashboard(props) {
  const defaultImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reRender, setReRender] = useState(true);
  const [authorizing, setAuthorizing] = useState(true);
  const [saleData, setSaleData] = useState([
    { date: new Date(2022, 2, 24).toISOString(), total: 13000 },
    { date: new Date(2022, 2, 25).toISOString(), total: 33000 },
    { date: new Date(2022, 2, 26).toISOString(), total: 23000 },
    { date: new Date(2022, 2, 27).toISOString(), total: 53000 },
  ]);

  const [orderData, setOrderData] = useState([
    { date: new Date(2022, 2, 24).toISOString(), total: 13000 },
    { date: new Date(2022, 2, 25).toISOString(), total: 33000 },
    { date: new Date(2022, 2, 26).toISOString(), total: 23000 },
    { date: new Date(2022, 2, 27).toISOString(), total: 53000 },
  ]);

  const [dashboardInfo, setDashboardInfo] = useState({
    orderCount: 0,
    productCount: 0,
    uncheckOrderCount: 0,
    userCount: 0,
  });

  const [topProduct, setTopProduct] = useState([
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
  ]);

  var date = new Date();
  date.setDate(date.getDate() - 7);
  const [dfrom, setDfrom] = useState(formatDate(date, "dd-MM-yyyy"));
  const [dto, setDto] = useState(formatDate(new Date(), "dd-MM-yyyy"));

  const [searchType, setSearchType] = useState("Product");
  const [searchBy, setSearchBy] = useState("Name");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [currentResultPage, setCurrentResultPage] = useState(1)
  const [totalResultPage, setTotalResultPage] = useState(1)
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
    GetSearchResult(1,4)
  };
  function GetSearchResult(pageNumber,pageSize){
    setCurrentResultPage(pageNumber)
    if(searchType=="User"){
      AdminService.GetSearchResult_User(searchBy, keyword, pageNumber, pageSize)
      .then((res) => {
        //console.log(res.data);
        setTotalResultPage(Math.ceil(Number(res.data.total / pageSize)))
        setSearchResult(res.data.result)
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSearching(false);
      });
    }
    else{
      AdminService.GetSearchResult(searchType, searchBy, keyword, pageNumber, pageSize)
      .then((res) => {
        //console.log(res.data);
        setTotalResultPage(Math.ceil(Number(res.data.total / pageSize)))
        setSearchResult(res.data.result)
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
        //console.log("Không có quyền truy cập");

        window.location.href = "/login";
      })
      .finally(() => {});
  }, [reRender]);

  function ReRender() {
    setReRender(!reRender);
  }

  async function LoadDashboardInfo() {
    var today = new Date();
    //console.log(formatDate(today, "yyyy-MM-dd"));
    var priorDate = new Date(new Date().setDate(today.getDate() - 7));
    //console.log(formatDate(priorDate, "yyyy-MM-dd"));
    AdminService.GetSaleStatistic(
      formatDate(priorDate, "yyyy-MM-dd"),
      formatDate(today, "yyyy-MM-dd")
    )
      .then((res) => {
        //console.log(res.data);
        var result = res.data.result;
        var list = [];
        for (const item in result) {
          // console.log(item)
          // console.log(result[item])
          var newTK = {
            date: item,
            total: result[item],
          };
          list.push(newTK);
        }
        setSaleData(list);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});

    AdminService.GetOrderStatistic(
      formatDate(priorDate, "yyyy-MM-dd"),
      formatDate(today, "yyyy-MM-dd")
    )
      .then((res) => {
        //console.log(res.data.result)
        var result = res.data.result;
        var list = [];
        for (const item in result) {
          // console.log(item);
          // console.log(result[item]);
          var newTK = {
            date: item,
            total: result[item],
          };
          list.push(newTK);
        }
        setOrderData(list);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});

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
        setDashboardInfo(info);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});

    AdminService.GetTopProductStatistic(10)
      .then((res) => {
        setTopProduct(res.data.result);
        //console.log(res.data)
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
              <div className="row" id="saleChart">
                <p className="lead text-white border border-3 p-3 lh-1">
                  <i className="fa-solid fa-chart-line me-2"></i> Thống kê doanh
                  thu từ {dfrom} đến {dto}{" "}
                  <i
                    className="fa-solid fa-arrows-rotate float-end"
                    onClick={ReRender}
                  ></i>
                </p>
                <div className="container" style={{ height: 500 + "px" }}>
                  <SaleChart saleData={saleData}></SaleChart>
                </div>
              </div>
              <div className="row" id="topProductChart">
                <p className="lead text-white border border-3 p-3 lh-1">
                  <i className="fa-solid fa-chart-line me-2"></i> Thống kê sản
                  phẩm bán chạy nhất
                  <i
                    className="fa-solid fa-arrows-rotate float-end"
                    onClick={ReRender}
                  ></i>
                </p>
                <div className="container" style={{ height: 500 + "px" }}>
                  <TopProductChart productData={topProduct}></TopProductChart>
                </div>
              </div>
              <div className="row" id="orderChart">
                <p className="lead text-white border border-3 p-3 lh-1">
                  <i className="fa-solid fa-chart-line me-2"></i> Thống kê đơn
                  hàng từ {dfrom} đến {dto}{" "}
                  <i
                    className="fa-solid fa-arrows-rotate float-end"
                    onClick={ReRender}
                  ></i>
                </p>
                <div className="container" style={{ height: 500 + "px" }}>
                  <OrderChart saleData={orderData}></OrderChart>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      )}

      <SearchModal
        showSearchModal={showSearchModal}
        handleCloseSearchModal={handleCloseSearchModal}
        isSearching={isSearching}
        searchResult = {searchResult}
        searchType = {searchType}
        GetSearchResult = {GetSearchResult}
        currentResultPage = {currentResultPage}
        totalResultPage = {totalResultPage}
      ></SearchModal>
     
    </Fragment>
  );
}

export default Dashboard;

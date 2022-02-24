import { React, Fragment, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./Admin.css";
import AdminHeader from "./AdminHeader";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import SaleChart from "./Chart/SaleChart";

function Dashboard(props) {
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

  function updateData() {
    setSaleData([
      { date: new Date(2022, 2, 24).toISOString(), total: 53000 },
      { date: new Date(2022, 2, 25).toISOString(), total: 23000 },
      { date: new Date(2022, 2, 26).toISOString(), total: 33000 },
      { date: new Date(2022, 2, 27).toISOString(), total: 13000 },
    ])
  }
  AuthService.GetAuthorizeAdmin()
    .then((res) => {
      //console.log(res.data);
      setAuthorizing(false);
    })
    .catch((e) => {
      //console.log("Không có quyền truy cập");
      window.location.href = "/error";
    })
    .finally(() => {});

  function ReRender() {
    setReRender(!reRender);
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
                      <select className="form-select" defaultValue={"Product"}>
                        <option value="Product">Sản phẩm</option>
                        <option value="Name">Tên</option>
                        <option value="Tag">Thẻ</option>
                      </select>
                    </div>
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
                        <option value="Tag">Thẻ</option>
                      </select>
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
                          <label className="tx-13 mb-1">Total Revenue</label>
                        </div>
                        <h4 className="font-weight-normal">$6,800.00</h4>{" "}
                        <small>
                          <b className="badge rounded-pill bg-success fs-11">
                            65%
                          </b>
                          <span className="px-1">Higher</span>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Total Revenue</label>
                        </div>
                        <h4 className="font-weight-normal">$6,800.00</h4>{" "}
                        <small>
                          <b className="badge rounded-pill bg-success fs-11">
                            65%
                          </b>
                          <span className="px-1">Higher</span>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Total Revenue</label>
                        </div>
                        <h4 className="font-weight-normal">$6,800.00</h4>{" "}
                        <small>
                          <b className="badge rounded-pill bg-success fs-11">
                            65%
                          </b>
                          <span className="px-1">Higher</span>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Total Revenue</label>
                        </div>
                        <h4 className="font-weight-normal">$6,800.00</h4>{" "}
                        <small>
                          <b className="badge rounded-pill bg-success fs-11">
                            65%
                          </b>
                          <span className="px-1">Higher</span>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="container" style={{ height: 500 + "px" }}>
                  <button className="btn btn-primary" onClick={updateData}>
                    Update
                  </button>
                  <SaleChart data={saleData}></SaleChart>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Dashboard;

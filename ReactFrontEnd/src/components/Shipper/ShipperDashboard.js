import { React, Fragment, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ShipperHeader from "./ShipperHeader";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
function ShipperDashboard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authorizing, setAuthorizing] = useState(true);

  AuthService.GetAuthorizeShipper()
    .then((res) => {
      //console.log(res.data);
      setAuthorizing(false)
    })
    .catch((e) => {
      //console.log("Không có quyền truy cập");
      window.location.href = "/login";
    })
    .finally(() => {});

  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <ShipperHeader></ShipperHeader>
          <div className="w-100 h-100" style={{ backgroundColor: "#6666C4" }}>
            <div className="container  py-3 ">
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
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ShipperDashboard;

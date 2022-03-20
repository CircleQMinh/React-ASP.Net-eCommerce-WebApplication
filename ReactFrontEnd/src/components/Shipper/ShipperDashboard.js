import { React, Fragment, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ShipperHeader from "./ShipperHeader";

import { NavLink, useNavigate,Link } from "react-router-dom";
import AdminLoading from "../Admin/AdminLoading";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import ShipperService from "../../api/ShipperService";
function ShipperDashboard(props) {
  const [authorizing, setAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);
  var navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

  const [dashboardInfo, setDashboardInfo] = useState({
    done: 0,
    delivering: 0,
    available: 0,
  });

  useEffect(() => {
    AuthService.GetAuthorizeShipper()
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

  async function LoadDashboardInfo() {
    ShipperService.GetDashboardInfo(user.id)
      .then((res) => {
        console.log(res.data);
        var data = res.data;
        var info = {
          done: data.done,
          delivering: data.delivering,
          available: data.available,
        };
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
          <ShipperHeader></ShipperHeader>
          <div className="w-100 h-100" style={{ backgroundColor: "#6666C4",minHeight:600+"px" }}>
            <div className="container  py-3 ">
              <div className="row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Đơn hàng có thể nhận</label>
                        </div>
                        <h4 className="font-weight-normal">{dashboardInfo.available}</h4>{" "}
                        <small>
                          <Link to={"/shipper/find"} className="btn btn-success">
                          Xem đơn hàng có thể nhận
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
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
                          <label className="tx-13 mb-1">Đơn hàng đang giao</label>
                        </div>
                        <h4 className="font-weight-normal">{dashboardInfo.delivering}</h4>{" "}
                        <small>
                          <Link to={"/shipper/current"} className="btn btn-success">
                            Xem đơn hàng đang giao 
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-dolly admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Đơn hàng đã hoàn thành</label>
                        </div>
                        <h4 className="font-weight-normal">{dashboardInfo.done}</h4>{" "}
                        <small>
                          <Link to={"/shipper/history"} className="btn btn-success">
                            Xem đơn hàng đã hoàn thành
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-truck-fast admin_db_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="card custom-card">
                    <div className="card-body d-flex">
                      <div className="col-10">
                        <div className="card-title mb-2">
                          <label className="tx-13 mb-1">Xem lịch sử giao hàng</label>
                        </div>
                        <small>
                          <Link to={"/shipper/history"} className="btn btn-success">
                            Đến quản lý đơn hàng
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </small>
                      </div>
                      <div className="col-2 fs-5">
                        <i className="fa-solid fa-clock-rotate-left admin_db_icon"></i>
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

      {authorizing && <AdminLoading></AdminLoading>}
    </Fragment>
  );
}

export default ShipperDashboard;

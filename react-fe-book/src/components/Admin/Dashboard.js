import { React, Fragment } from "react";
import Footer from "../Footer/Footer";
import "./Admin.css";
import AdminHeader from "./AdminHeader";
function Dashboard(props) {
  return (
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
                  <label className="text-white fw-bold fs-3">Tìm kiếm : </label>
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
              <div class="card custom-card">
                <div class="card-body d-flex">
                  <div className="col-10">
                    <div class="card-title mb-2">
                      <label class="tx-13 mb-1">Total Revenue</label>
                    </div>
                    <h4 class="font-weight-normal">$6,800.00</h4>{" "}
                    <small>
                      <b class="badge rounded-pill bg-success fs-11">65%</b>
                      <span class="px-1">Higher</span>
                    </small>
                  </div>
                  <div className="col-2 fs-5">
                    <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 mb-3">
              <div class="card custom-card">
                <div class="card-body d-flex">
                  <div className="col-10">
                    <div class="card-title mb-2">
                      <label class="tx-13 mb-1">Total Revenue</label>
                    </div>
                    <h4 class="font-weight-normal">$6,800.00</h4>{" "}
                    <small>
                      <b class="badge rounded-pill bg-success fs-11">65%</b>
                      <span class="px-1">Higher</span>
                    </small>
                  </div>
                  <div className="col-2 fs-5">
                    <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 mb-3">
              <div class="card custom-card">
                <div class="card-body d-flex">
                  <div className="col-10">
                    <div class="card-title mb-2">
                      <label class="tx-13 mb-1">Total Revenue</label>
                    </div>
                    <h4 class="font-weight-normal">$6,800.00</h4>{" "}
                    <small>
                      <b class="badge rounded-pill bg-success fs-11">65%</b>
                      <span class="px-1">Higher</span>
                    </small>
                  </div>
                  <div className="col-2 fs-5">
                    <i className="fas fa-file-invoice-dollar admin_db_icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 mb-3">
              <div class="card custom-card">
                <div class="card-body d-flex">
                  <div className="col-10">
                    <div class="card-title mb-2">
                      <label class="tx-13 mb-1">Total Revenue</label>
                    </div>
                    <h4 class="font-weight-normal">$6,800.00</h4>{" "}
                    <small>
                      <b class="badge rounded-pill bg-success fs-11">65%</b>
                      <span class="px-1">Higher</span>
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
  );
}

export default Dashboard;

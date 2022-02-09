import { React, Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
function Profile() {
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;
  console.log(params.id);

  const [authorizing, setAuthorizing] = useState(true);

  if (authorizing) {
    AuthService.GetAuthorizeUser(userId)
      .then((res) => {
        console.log(res.data);
        setAuthorizing(false);
      })
      .catch((e) => {
        console.log("Không có quyền truy cập");
        window.location.href = "/error";
      })
      .finally(() => {});
  }

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <Header></Header>
          {!isLoading && (
            <Fragment>
              <div className="container-fluid mt-2">
                <nav aria-label="breadcrumb" className="mt-2 breadcrumb_nav">
                  <ol className="breadcrumb mt-2 ms-2">
                    <li className="breadcrumb-item">
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <NavLink to="/">Profile</NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <p>{user.userName}</p>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="container mt-2">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src={user.imgUrl}
                            alt="Admin"
                            className="rounded-circle"
                            width="150"
                          ></img>
                          <div className="container mt-3">
                            <h4>{user.userName}</h4>
                            <p className="text-secondary mb-1">
                              <strong>Email : </strong>
                              {user.email}
                            </p>
                            <p className="text-muted font-size-sm">
                              <strong>ID : </strong>
                              {user.id}
                            </p>
                            <button className="btn btn-danger btn-block">
                              <i className="fas fa-sign-out-alt"></i>
                              Logout
                            </button>
                            <button className="btn btn-outline-info btn-block">
                              <i className="fas fa-key"></i>
                              Password?
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mt-3">
                      <div className="container">
                        <div className="d-grid gap-2">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-info-circle me-2"></i>Thông tin
                          </button>
                          <Link
                            className="btn btn-outline-primary"
                            to={`/profile/${userId}/order`}
                          >
                            <i className="fas fa-receipt me-2"></i>Đơn hàng
                          </Link>
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            <i className="fas fa-file-invoice-dollar me-2"></i>
                            Mã giảm giá
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            <i className="far fa-heart me-2"></i>Yêu thích
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">User ID</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.id}
                          </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.email}
                          </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Username</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.userName}
                          </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.phoneNumber}
                          </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                          <div className="col-sm-12">
                            <button className="btn btn-info ">Chỉnh sửa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          {isLoading && (
            <div className=" full_page_spinner ">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="lead text-center mt-2">
                Đang tải thông tin. Xin chờ một tí...
              </p>
            </div>
          )}
          <Footer></Footer>
        </Fragment>
      )}
      {authorizing && (
          <div className=" full_page_spinner ">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="lead text-center mt-2">
            Đang tải thông tin. Xin chờ một tí...
          </p>
        </div>
      )}
    </Fragment>
  );
}

export default Profile;

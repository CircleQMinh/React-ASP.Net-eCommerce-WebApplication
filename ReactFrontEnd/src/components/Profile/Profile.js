import { React, Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Modal } from "react-bootstrap";
import AuthService from "../../api/AuthService";
import { useForm } from "react-hook-form";
import UserService from "../../api/UserService";
import { upLoadImageToCloudinary } from "../../helper/Cloudinary";
import { toast } from "react-toastify";
function Profile() {
  const [reRender, setReRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [uploadImg, setUploadImg] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;
  //console.log(params.id);

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

  useEffect(() => {
    UserService.GetUserInfo(user.id)
      .then((res) => {
        // console.log(res.data.result);
        // console.log(user);
        // console.log("Gọi lấy data nè!")
        localStorage.setItem("user", JSON.stringify(res.data.result));
        setUser(JSON.parse(localStorage.getItem("user")));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }, [reRender]);

  //console.log(user);
  let {
    register: registerEditModal,
    handleSubmit: handleSubmitEditModal,
    watch,
    reset: resetEditModal,
    formState: { errors: editModalError },
  } = useForm();

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
      setUploadImg(true);
    };
  }
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setselectedImgUrl(user.imgUrl);
    setUploadImg(false);
  };
  const handleShowEditModal = () => {
    setShowEditModal(true);
    setselectedImgUrl(user.imgUrl);
  };
  function onSave_EditModal(data) {
    console.log("Update User");
    setIsEditing(true);
    if (uploadImg) {
      upLoadImageToCloudinary(selectedImgUrl)
        .then((res) => {
          setselectedImgUrl(res.data.url);
          UpdateProfile(data);
        })
        .catch((e) => {
          console.log(e);
          setIsEditing(false);
          setShowEditModal(false);
        });
    } else {
      UpdateProfile(data);
    }
  }

  function UpdateProfile(data) {
    var newUser = {
      imgUrl: selectedImgUrl ? selectedImgUrl : defaultImgUrl,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
    };
    UserService.EditUser(user.id, newUser)
      .then((res) => {
        if (res.data.success) {
          toast.success("Chỉnh sửa thành công!", {
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
        setIsEditing(false);
        setShowEditModal(false);
        setReRender(!reRender);
      });
  }
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
                            <p className="text-muted font-size-sm">
                              <strong>Shop Xu : </strong>
                              {user.coins}
                            </p>
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
                            <button
                              className="btn btn-info "
                              onClick={handleShowEditModal}
                            >
                              Chỉnh sửa
                            </button>
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

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Tên người dùng : </label>
            <div className="input-group">
              <input
                className="form-control"
                defaultValue={user.userName}
                placeholder="Tên..."
                {...registerEditModal("userName", {
                  required: true,
                })}
              ></input>
            </div>
            {editModalError.userName?.type === "required" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Tên người dùng
                không để trống
              </p>
            )}
            <label>SDT : </label>
            <div className="input-group">
              <input
                defaultValue={user.phoneNumber}
                className="form-control"
                type="tel"
                {...registerEditModal("phoneNumber", {
                  required: true,
                  minLength: 9,
                  maxLength: 10,
                })}
              ></input>
            </div>
            {editModalError.phoneNumber?.type === "required" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>SDT không để
                trống
              </p>
            )}
            {editModalError.phoneNumber?.type === "minLength" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>SDT không hợp lệ
              </p>
            )}
            {editModalError.phoneNumber?.type === "maxLength" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>SDT không hợp lệ
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
          </form>
        </Modal.Body>
        {isEditing && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseEditModal}>
            Close
          </button>
          <button
            disabled={isEditing}
            className="btn btn-success"
            onClick={handleSubmitEditModal(onSave_EditModal)}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Profile;

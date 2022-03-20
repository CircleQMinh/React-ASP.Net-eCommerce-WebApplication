import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AdminService from "../../../api/AdminService";
import { upLoadImageToCloudinary } from "../../../helper/Cloudinary";

function AddEmployeeModal(props) {
  var showAddModal = props.showAddModal;
  var setShowAddModal = props.setShowAddModal;

  const [selectedImgUrl, setselectedImgUrl] = useState(null);

  const [uploadImg, setUploadImg] = useState(false);

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

  function onAddButtonClick(data) {
    setIsAdding(true);
    if (uploadImg) {
      upLoadImageToCloudinary(
        selectedImgUrl == null ? defaultImgUrl : selectedImgUrl
      )
        .then((res) => {
          setselectedImgUrl(res.data.url);
          if (data.type == "shipper") {
            AddShipper(data, res.data.url);
          } else {
            AddEmployee(data, res.data.url);
          }
        })
        .catch((e) => {
          console.log(e);
          setIsAdding(false);
          setShowAddModal(false);
        });
    } else {
      if (data.type == "shipper") {
        AddShipper(data);
      } else {
        AddEmployee(data);
      }
    }
  }
  function AddShipper(data, url) {
    var shipper = {
      imgUrl: url ? url : defaultImgUrl,
      userName: data.name,
      phoneNumber: data.phone,
      roles: ["Shipper"],
      email: data.email,
      password: data.phone, //dùng phone cho password
      doB: new Date(data.doB).toISOString(),
      address: data.address,
      sex: data.sex,
      salary: data.salary,
      cmnd: data.cmnd,
      startDate: new Date().toISOString(),
    };
    AdminService.CreateShipper(shipper)
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
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
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsAdding(false);
      setShowAddModal(false);
      resetAddModal();
      setselectedImgUrl(defaultImgUrl);
      ReRender();
    });
  }
  function AddEmployee(data, url) {
    var employee = {
      name: data.name,
      doB: new Date(data.doB).toISOString(),
      address: data.address,
      sex: data.sex,
      salary: data.salary,
      cmnd: data.cmnd,
      startDate: new Date().toISOString(),
      email: data.email,
      imgUrl: url ? url : selectedImgUrl,
    };

    console.log(employee);

    AdminService.CreateEmployee(employee)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
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
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsAdding(false);
        setShowAddModal(false);
        resetAddModal();
        setselectedImgUrl(defaultImgUrl);
        ReRender();
      });
  }
  function ReRender() {
    props.reRender();
  }
  return (
    <Fragment>
      {" "}
      {/* add modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhân viên </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Loại nhân viên</label>
              <select
                className="form-select"
                defaultValue={"emp"}
                {...registerAddModal("type", {
                  required: true,
                })}
              >
                <option value="emp">Nhân viên</option>
                <option value="shipper">Shipper</option>
              </select>
              <label>Tên nhân viên : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Tên nhân viên..."
                  {...registerAddModal("name", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.name?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Tên không để
                  trống
                </p>
              )}
              <label>Số điện thoại : </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="SDT..."
                  {...registerAddModal("phone", {
                    required: true,
                    minLength: 9,
                    maxLength: 10,
                  })}
                ></input>
              </div>
              {addModalError.phone?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không để
                  trống
                </p>
              )}
              {addModalError.phone?.type === "minLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không hợp
                  lệ
                </p>
              )}
              {addModalError.phone?.type === "maxLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>SDT không hợp
                  lệ
                </p>
              )}
              <label>Email : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Email..."
                  {...registerAddModal("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                ></input>
              </div>
              {addModalError.email?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email chưa điền
                </p>
              )}
              {addModalError.email?.type === "pattern" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email không hợp
                  lệ
                </p>
              )}
              <label>Ngày sinh</label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Ngày sinh.."
                  type="date"
                  {...registerAddModal("doB", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.doB?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Nhập ngày sinh
                </p>
              )}
              <label>Địa chỉ: </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Địa chỉ..."
                  {...registerAddModal("address", {
                    required: true,
                  })}
                ></input>
              </div>
              {addModalError.address?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Địa chỉ không
                  để trống
                </p>
              )}

              <label>Giới tính</label>
              <select
                className="form-select"
                defaultValue={"M"}
                {...registerAddModal("sex", {
                  required: true,
                })}
              >
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </select>
              <label>Lương : </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Lương..."
                  {...registerAddModal("salary", {
                    required: true,
                    min: 0,
                  })}
                ></input>
              </div>
              {addModalError.salary?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Lương không để
                  trống
                </p>
              )}
              {addModalError.salary?.type === "min" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Lương không hợp
                  lệ
                </p>
              )}

              <label>Chứng minh nd : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="CMND..."
                  {...registerAddModal("cmnd", {
                    required: true,
                    minLength: 12,
                  })}
                ></input>
              </div>
              {addModalError.cmnd?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>CMND không để
                  trống
                </p>
              )}
              {addModalError.cmnd?.type === "minLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>CMND không hợp
                  lệ
                </p>
              )}
              <label>Ảnh profile</label>
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

export default AddEmployeeModal;

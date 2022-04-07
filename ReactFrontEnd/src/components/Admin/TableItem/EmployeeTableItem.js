import { React, Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import AdminService from "../../../api/AdminService";
import { useForm } from "react-hook-form";
import { upLoadImageToCloudinary } from "../../../helper/Cloudinary";
import ShipperHistoryModal from "../Modal/ShipperHistoryModal";
function EmployeeTableItem(props) {
  var item = props.item;
  //console.log(item);
  const isExportPDF = props.isExportPDF;
  let {
    register: registerEditModal,
    handleSubmit: handleSubmitEditModal,
    watch,
    reset: resetEditModal,
    formState: { errors: editModalError },
  } = useForm();

  const [uploadImg, setUploadImg] = useState(false);
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
    setselectedImgUrl(null);
  };
  const handleShowEditModal = () => {
    setShowEditModal(true);
    setselectedImgUrl(item.imgUrl);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  function onSave_EditModal(data) {
    setIsEditing(true);
    if (uploadImg) {
      upLoadImageToCloudinary(selectedImgUrl)
        .then((res) => {
          setselectedImgUrl(res.data.url);
          EditEmployee(data, res.data.url);
        })
        .catch((e) => {
          console.log(e);
          setIsEditing(false);
          setShowEditModal(false);
        });
    } else {
      EditEmployee(data);
    }
  }

  function EditEmployee(data, url) {
    var emp = {
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

    AdminService.EditEmployee(item.id, emp)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
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
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsEditing(false);
        setShowEditModal(false);
        resetEditModal();
        setselectedImgUrl(defaultImgUrl);
        props.reRender();
      });
  }

  function onDelete_DeleteModal() {
    setIsDeleting(true);
    AdminService.DeleteEmployee(item.id)
      .then((response) => {
        if (response.data.success) {
          toast.success("Xóa thành công!", {
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
        toast.error("Có lỗi xảy ra! Xin hãy thử lại", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setIsDeleting(false);
        setShowDeleteModal(false);
        props.reRender();
      });
  }

  const [showShipperHistoryModal, setShowShipperHistoryModal] = useState(false);
  const handleShowShipperHistoryModal = () => {
    setShowShipperHistoryModal(true);
    console.log("a");
  };
  const handleCloseShipperHistoryModal = () => {
    setShowShipperHistoryModal(false);
  };

  return (
    <Fragment>
      <tr className="animate__animated">
        <td className="text-center text-black">
          <div className="photo d-flex justify-content-start align-items-center">
            {!isExportPDF && (
              <img
                className="admin_img_table me-2"
                src={item.imgUrl}
                alt="photoimg"
              ></img>
            )}

            {item.shipperId == null && <p>{item.name} (Nhân viên)</p>}
            {item.shipperId != null && <p>{item.name} (Shipper)</p>}
          </div>
        </td>
        <td className="text-black">
          {" "}
          {formatDate(new Date(item.doB + "Z"), "dd-MM-yyyy")}
        </td>
        <td className="text-black">{item.sex}</td>
        <td className="text-black">
          <p>Email : {item.email}</p>
          <p>Địa chỉ : {item.address}</p>
          <p>Số CMND : {item.cmnd}</p>
        </td>
        <td className="text-black">
          <NumberFormat
            value={item.salary}
            className="text-center text-danger text-decoration-underline  "
            displayType={"text"}
            thousandSeparator={true}
            suffix={"đ"}
            renderText={(value, props) => <span {...props}>{value}</span>}
          />
        </td>
        <td className="text-black">
          {" "}
          {formatDate(new Date(item.startDate + "Z"), "dd-MM-yyyy")}
        </td>
        {!isExportPDF && (
          <td className="text-black">
            <div className="btn-group">
              {item.shipperId != null && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleShowShipperHistoryModal}
                >
                  <i className="fas fa-info-circle"></i>
                </button>
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleShowEditModal}
              >
                <i className="far fa-edit"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleShowDeleteModal}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </td>
        )}
      </tr>

      {/* edit modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa nhân viên </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Tên nhân viên : </label>
              <div className="input-group">
                <input
                  defaultValue={item.name}
                  className="form-control"
                  placeholder="Tên nhân viên..."
                  {...registerEditModal("name", {
                    required: true,
                  })}
                ></input>
              </div>
              {editModalError.name?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Tên không để
                  trống
                </p>
              )}
              <label>Email : </label>
              <div className="input-group">
                <input
                  defaultValue={item.email}
                  className="form-control"
                  placeholder="Email..."
                  {...registerEditModal("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                ></input>
              </div>
              {editModalError.email?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email chưa điền
                </p>
              )}
              {editModalError.email?.type === "pattern" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Email không hợp
                  lệ
                </p>
              )}
              <label>Ngày sinh</label>
              <div className="input-group">
                <input
                  defaultValue={formatDate(new Date(item.doB), "yyyy-MM-dd")}
                  className="form-control"
                  placeholder="Ngày sinh.."
                  type="date"
                  {...registerEditModal("doB", {
                    required: true,
                  })}
                ></input>
              </div>
              {editModalError.doB?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Nhập ngày sinh
                </p>
              )}
              <label>Địa chỉ: </label>
              <div className="input-group">
                <input
                  defaultValue={item.address}
                  className="form-control"
                  placeholder="Địa chỉ..."
                  {...registerEditModal("address", {
                    required: true,
                  })}
                ></input>
              </div>
              {editModalError.address?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Địa chỉ không
                  để trống
                </p>
              )}

              <label>Giới tính</label>
              <select
                className="form-select"
                defaultValue={item.sex}
                {...registerEditModal("sex", {
                  required: true,
                })}
              >
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </select>
              <label>Lương : </label>
              <div className="input-group">
                <input
                  defaultValue={item.salary}
                  type="number"
                  className="form-control"
                  placeholder="Lương..."
                  {...registerEditModal("salary", {
                    required: true,
                    min: 0,
                  })}
                ></input>
              </div>
              {editModalError.salary?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Lương không để
                  trống
                </p>
              )}
              {editModalError.salary?.type === "min" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Lương không hợp
                  lệ
                </p>
              )}

              <label>Chứng minh nd : </label>
              <div className="input-group">
                <input
                  defaultValue={item.cmnd}
                  className="form-control"
                  placeholder="CMND..."
                  {...registerEditModal("cmnd", {
                    required: true,
                    minLength: 12,
                  })}
                ></input>
              </div>
              {editModalError.cmnd?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>CMND không để
                  trống
                </p>
              )}
              {editModalError.cmnd?.type === "minLength" && (
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
      {/* delete modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Xóa thông tin </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-tron text-monospace">Xóa người dùng này?</p>
          <p className="text-center">
            <i className="fas fa-exclamation-triangle"></i>Bất cứ thông tin nào
            liên quan đến người dùng sẽ bị xóa!
          </p>
        </Modal.Body>
        {isDeleting && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseDeleteModal}>
            Close
          </button>
          <button
            disabled={isDeleting}
            className="btn btn-success"
            onClick={onDelete_DeleteModal}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>

      {/* shipper History modal */}
      {showShipperHistoryModal && (
        <ShipperHistoryModal
          id={item.shipperId}
          close={handleCloseShipperHistoryModal}
        ></ShipperHistoryModal>
      )}
    </Fragment>
  );
}

export default EmployeeTableItem;

import { React, Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import AdminService from "../../../api/AdminService";
import { useForm } from "react-hook-form";
function DiscountTableItem(props) {
  var item = props.item;
  //console.log(item);

  let {
    register: registerEditModal,
    handleSubmit: handleSubmitEditModal,
    watch,
    reset: resetEditModal,
    formState: { errors: editModalError },
  } = useForm();

  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  function onSave_EditModal(data) {
    if (data.type == "amount") {
      if (data.value < 1000) {
        toast.error("Giá trị giảm giá phải ít nhất là 1000VND!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    } else {
      if (data.value < 10) {
        toast.error("Giá trị giảm giá ít nhất là 10%!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      if (data.value > 99) {
        toast.error("Giá trị giảm giá tối đa là 99%!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }
    //console.log(data);
    var newDC = {
      code: data.code,
      discountPercent: data.type == "percent" ? data.value : null,
      discountAmount: data.type == "amount" ? data.value : null,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: 0,
    };
    //console.log(newDC)
    setIsEditing(true);
    AdminService.PutDiscountCode(newDC,item.id )
      .then((res) => {
        if (res.data.success) {
          toast.success("Chỉnh sửa thành công!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(res.data.error, {
            position: "top-center",
            autoClose: 2000,
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
        resetEditModal();
        props.reRender();
      });
  }
  function onDelete_DeleteModal() {
    setIsDeleting(true);
    AdminService.DeleteDiscountCode(item.id)
      .then((res) => {
        if (res.data.success) {
            toast.success("Xóa thành công!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            toast.error(res.date.error, {
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
        console.log(e)
      })
      .finally(() => {
        setIsDeleting(false)
        setShowDeleteModal(false)
        props.reRender();
      });
  }
  const [code, setCode] = useState(item.code);

  function upperCaseMyText(event) {
    setCode(event.target.value.toUpperCase());
  }
  var today = new Date();
  var minDay = "";
  var maxDay = "";
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  minDay = yyyy + "-" + mm + "-" + dd;
  dd = today.getDate() + 1;
  maxDay = yyyy + "-" + mm + "-" + dd;


  var startDate = formatDate(new Date(item.startDate+"Z"),"yyyy-MM-dd")
  var endDate = formatDate(new Date(item.endDate+"Z"),"yyyy-MM-dd")

  var dc_type = item.discountAmount!=null?"amount":"percent"

  var value = item.discountAmount!=null?item.discountAmount:item.discountPercent

  return (
    <Fragment>
      <tr>
        <td className="text-white">{item.code}</td>
        <td className="text-white">
          {item.discountAmount ? (
            <NumberFormat
              value={item.discountAmount}
              className="text-center text-danger text-decoration-underline  "
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              renderText={(value, props) => <span {...props}>{value}</span>}
            />
          ) : (
            <span className="text-center text-danger text-decoration-underline  ">
              {" "}
              {item.discountPercent + "%"}
            </span>
          )}
        </td>
        <td className="text-white">
          {" "}
          {formatDate(new Date(item.startDate + "Z"), "dd-MM-yyyy")}
        </td>
        <td className="text-white">
          {" "}
          {formatDate(new Date(item.endDate + "Z"), "dd-MM-yyyy")}
        </td>
        <td className="text-white">
          <div className="btn-group">
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
      </tr>

      {/* edit modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="form-group">
              <label>Mã giảm giá : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Mã giảm giá..."
                  {...registerEditModal("code", {
                    required: true,
                    minLength: 8,
                  })}
                  value={code}
                  onChange={upperCaseMyText}
                ></input>
              </div>
              {editModalError.code?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Mã giảm giá
                  không để trống
                </p>
              )}
              {editModalError.code?.type === "minLength" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Mã giảm giá
                  phải đủ 8 kí tự
                </p>
              )}
              <label>Loại giảm giá</label>
              <select
                className="form-select"
                {...registerEditModal("type", {
                  required: true,
                })}
                defaultValue={dc_type}
              >
                <option value="amount">Theo VND</option>
                <option value="percent">Theo %</option>
              </select>
              <label>Giá trị giảm giá : </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Giá trị giảm giá..."
                  {...registerEditModal("value", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  defaultValue={value}
                ></input>
              </div>
              {editModalError.value?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Giá trị giảm
                  giá không hợp lệ
                </p>
              )}
              {editModalError.value?.type === "valueAsNumber" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Giá trị giảm
                  giá không hợp lệ
                </p>
              )}

              <label>Ngày bắt đầu : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Ngày bắt đầu.."
                  type="date"
                  min={minDay}
                  {...registerEditModal("startDate", {
                    required: true,
                  })}
                  defaultValue={startDate}
                ></input>
              </div>
              {editModalError.startDate?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Ngày bắt đầu
                  không để trống
                </p>
              )}
              <label>Ngày kết thúc : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Ngày bắt đầu.."
                  type="date"
                  min={maxDay}
                  {...registerEditModal("endDate", {
                    required: true,
                  })}
                  defaultValue={endDate}
                ></input>
              </div>
              {editModalError.endDate?.type === "required" && (
                <p className="text-start m-0">
                  <i className="fas fa-exclamation-triangle"></i>Ngày kết thúc
                  không để trống
                </p>
              )}
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
          <p className="text-tron text-monospace">Xóa mã giảm giá này?</p>
          <p className="text-center">
            <i className="fas fa-exclamation-triangle"></i>Bất cứ thông tin nào
            liên quan đến mã sẽ bị xóa!
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
    </Fragment>
  );
}

export default DiscountTableItem;

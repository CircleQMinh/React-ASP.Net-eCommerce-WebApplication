import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AdminService from "../../../api/AdminService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function AddRandomDCModal(props) {
  var minDay = props.minDay;
  var maxDay = props.maxDay;

  const [isLoading, setIsLoading] = useState(false);
  let {
    register: registerAddModal,
    handleSubmit: handleSubmitAddModal,
    watch,
    reset: resetAddModal,
    formState: { errors: addModalError },
  } = useForm();

  function handleCloseInfoModal() {
    props.close();
  }
  function onSaveClick(data) {
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
    console.log(data);

    var dto = {
      number: data.number,
      startDate: new Date(data.startDate).toISOString(),
      endDate:  new Date(data.endDate).toISOString(),
      discountPercent: data.type == "percent" ? data.value : null,
      discountAmount: data.type == "amount" ? data.value : null,
    };

    console.log(dto)
    setIsLoading(true);
    AdminService.PostGenerateDiscountCode(dto)
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
      setIsLoading(false);
      handleCloseInfoModal()
      props.reRender();
    });

  }
  return (
    <Fragment>
      <Modal show={true} onHide={handleCloseInfoModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Tạo mã giảm giá tự động </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Số mã giảm giá : </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Số mã giảm giá..."
              {...registerAddModal("number", {
                required: true,
                valueAsNumber: true,
              })}

            ></input>
          </div>
          {addModalError.number?.type === "required" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Số mã giảm giá chưa hợp lệ
              </p>
            )}
            {addModalError.number?.type === "valueAsNumber" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Số mã giảm giá 
                không hợp lệ
              </p>
            )}
          <div className="form-group">
            <label>Loại giảm giá</label>
            <select
              className="form-select"
              {...registerAddModal("type", {
                required: true,
              })}
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
                {...registerAddModal("value", {
                  required: true,
                  valueAsNumber: true,
                })}
              ></input>
            </div>
            {addModalError.value?.type === "required" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Giá trị giảm giá
                không hợp lệ
              </p>
            )}
            {addModalError.value?.type === "valueAsNumber" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Giá trị giảm giá
                không hợp lệ
              </p>
            )}

            <label>Ngày bắt đầu : </label>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Ngày bắt đầu.."
                type="date"
                min={minDay}
                {...registerAddModal("startDate", {
                  required: true,
                })}
              ></input>
            </div>
            {addModalError.startDate?.type === "required" && (
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
                {...registerAddModal("endDate", {
                  required: true,
                })}
              ></input>
            </div>
            {addModalError.endDate?.type === "required" && (
              <p className="text-start m-0">
                <i className="fas fa-exclamation-triangle"></i>Ngày kết thúc
                không để trống
              </p>
            )}
          </div>
        </Modal.Body>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text monospace ms-2">Đang xủ lý xin chờ tí...</p>
          </div>
        )}
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseInfoModal}>
            Close
          </button>
          <button
            disabled={isLoading}
            className="btn btn-success"
            onClick={handleSubmitAddModal(onSaveClick)}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddRandomDCModal;

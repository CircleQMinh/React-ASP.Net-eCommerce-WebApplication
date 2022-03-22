import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AdminService from "../../../api/AdminService";
import { toast } from "react-toastify";

function EditCoinsModal(props) {
  var userId = props.userId;
  const [coins, setCoins] = useState(props.coins);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(userId);
    // console.log(coins);
  }, []);

  function handleCloseInfoModal() {
    props.close();
  }

  function onShopXuChange(event) {
    if (event.target.validity.valid) {
      setCoins(event.target.value);
    }
  }

  function onSaveClick() {
    var obj = {
      id: userId,
      coins: coins,
    };

    setIsLoading(true);
    AdminService.EditUserCoinsForAdmin(obj)
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
      setIsLoading(false);
      handleCloseInfoModal()
      props.reRender();
    });
    //console.log(obj);
  }

  return (
    <Fragment>
      <Modal show={true} onHide={handleCloseInfoModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa shop xu </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Shop xu : </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Số shop xu..."
              value={coins}
              onChange={onShopXuChange}
              pattern={"[0-9]"}
            ></input>
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
            onClick={onSaveClick}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditCoinsModal;

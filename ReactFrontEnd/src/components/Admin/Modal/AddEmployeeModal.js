import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AdminService from "../../../api/AdminService";
import { upLoadImageToCloudinary } from "../../../helper/Cloudinary";

function AddEmployeeModal() {

  
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
        upLoadImageToCloudinary(selectedImgUrl==null?defaultImgUrl:selectedImgUrl)
          .then((res) => {
            setselectedImgUrl(res.data.url);
            AddEmployee(data, res.data.url);
          })
          .catch((e) => {
            console.log(e);
            setIsAdding(false);
            setShowAddModal(false);
          });
      } else {
        AddEmployee(data);
      }
    }
    function AddEmployee(data, url) {
      var book = {
        title: data.title,
        description: data.description,
        imgUrl: url ? url : selectedImgUrl,
        price: data.price,
        publishYear: data.publishYear,
        numberOfPage: data.numberOfPage,
        genres: selectedGenres,
        authors: selectedAuthors,
        publisherName: selectedPublisher,
      };
  
    //   AdminService.AddProduct(book)
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.data.success) {
    //         toast.success("Thêm thành công!", {
    //           position: "top-center",
    //           autoClose: 1000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //         });
    //       } else {
    //         toast.error("Có lỗi xảy ra! Xin hãy thử lại", {
    //           position: "top-center",
    //           autoClose: 1000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       setIsAdding(false);
    //       setShowAddModal(false);
    //       resetAddModal();
    //       setselectedImgUrl(defaultImgUrl);
    //       ReRender();
    //     });
    }
    function ReRender() {
      props.reRender();
    }
    return (
      <Fragment>
        {" "}
        {/* add product modal */}
        <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Tên sản phẩm : </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Tên sản phẩm..."
                    {...registerAddModal("title", {
                      required: true,
                    })}
                  ></input>
                </div>
                {addModalError.title?.type === "required" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Tên sản phẩm
                    không để trống
                  </p>
                )}
                <label>Mô tả : </label>
                <div className="input-group">
                  <textarea
                    placeholder="Mô tả sản phẩm"
                    className="form-control "
                    {...registerAddModal("description", {
                      required: true,
                    })}
                  ></textarea>
                </div>
                {addModalError.description?.type === "required" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Mô tả sản phẩm
                    không để trống
                  </p>
                )}
                <label>Giá : </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Giá sản phẩm.."
                    type="number"
                    {...registerAddModal("price", {
                      required: true,
                      min: 1000,
                      valueAsNumber: true,
                    })}
                  ></input>
                </div>
                {addModalError.price?.type === "required" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Giá sản phẩm
                    không để trống
                  </p>
                )}
                {(addModalError.price?.type === "min" ||
                  addModalError.price?.type === "valueAsNumber") && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Giá sản phẩm
                    không hợp lệ
                  </p>
                )}
                <label>Năm xuất bản : </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Năm xuất bản.."
                    type="number"
                    {...registerAddModal("publishYear", {
                      required: true,
                      min: 2000,
                      max: new Date().getFullYear(),
                    })}
                  ></input>
                </div>
                {addModalError.publishYear?.type === "required" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Năm xuất bản
                    không để trống
                  </p>
                )}
                {(addModalError.publishYear?.type === "min" ||
                  addModalError.publishYear?.type === "max") && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Năm xuất bản
                    không hợp lệ
                  </p>
                )}
                <label>Số trang : </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Số trang.."
                    type="number"
                    {...registerAddModal("numberOfPage", {
                      required: true,
                      min: 1,
                    })}
                  ></input>
                </div>
                {addModalError.numberOfPage?.type === "required" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Số trang không
                    để trống
                  </p>
                )}
                {addModalError.numberOfPage?.type === "min" && (
                  <p className="text-start m-0">
                    <i className="fas fa-exclamation-triangle"></i>Số trang không
                    hợp lệ
                  </p>
                )}
                <label>Thể loại : </label>
                <div className="input-group">
                  {selectedGenres.map((genre) => {
                    return (
                      <span
                        className="badge rounded-pill bg-warning text-dark mx-2  "
                        key={genre}
                        onClick={onRemoveGenreFromProduct}
                      >
                        {genre} <i className="far fa-times-circle"></i>
                      </span>
                    );
                  })}
  
                  <span
                    className="badge rounded-pill bg-info text-dark mx-2  "
                    onClick={handleShowAdd_AddGenreModal}
                  >
                    +
                  </span>
                </div>
  
                <label>Tác giả : </label>
                <div className="input-group">
                  {selectedAuthors.map((a) => {
                    return (
                      <span
                        className="badge rounded-pill bg-warning text-dark mx-2  "
                        key={a}
                        onClick={onRemoveAuthorFromProduct}
                      >
                        {a} <i className="far fa-times-circle"></i>
                      </span>
                    );
                  })}
  
                  <span
                    className="badge rounded-pill bg-info text-dark mx-2  "
                    onClick={handleShowAdd_AddAuthorModal}
                  >
                    +
                  </span>
                </div>
                <label>Nhà xuất bản : </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="(chọn từ danh sách hoặc thêm mới)..."
                    list="publishers"
                    id="pick_publisher"
                    onChange={onPublisherChange}
                  ></input>
                  <datalist id="publishers">
                    {listPublisher.map((a) => {
                      return (
                        <option value={a.name} key={a.id}>
                          {a.name}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
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

export default AddEmployeeModal
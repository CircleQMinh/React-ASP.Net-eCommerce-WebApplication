import { React, Fragment, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader";
import AdminService from "../../api/AdminService";
import ProductTableItem from "./TableItem/ProductTableItem";
import Pagination from "../Pagination/Pagination";
import ProductService from "../../api/ProductService";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthService from "../../api/AuthService";
import { upLoadImageToCloudinary } from "../../helper/Cloudinary";
import SearchModal from "./Modal/SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth_action } from "../../redux/auth_slice.js";
import AdminLoading from "./AdminLoading";
function AdminProduct() {
  const [authorizing, setAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);
  var navigate = useNavigate()

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

  useEffect(() => {
    AuthService.GetAuthorizeAdmin()
    .then((res) => {
      //console.log(res.data);
      setAuthorizing(false);
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
      setTimeout(()=>{
        dispatch(auth_action.logOut());
        navigate("/login")
      },2500)
    })
    .finally(() => {});
  },[reRender])


  const [listGenre, setListGenre] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listPublisher, setListPublisher] = useState([]);

  const [genre_filter, setGenre_filter] = useState("all");
  const [orderby, setOrderby] = useState("Id");
  const [sort, setSort] = useState("Asc");
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);


  const [selectedImgUrl, setselectedImgUrl] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState();
  
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

  const [showAddModal, setShowAddModal] = useState(false);
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
    setSelectedGenres([]);
    setSelectedAuthors([]);
    setSelectedPublisher(null);
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };
  //modal add genre
  const [showAdd_AddGenreModal, setShowAdd_AddGenreModal] = useState(false);

  const handleCloseAdd_AddGenreModal = () => {
    setShowAdd_AddGenreModal(false);
  };
  const handleShowAdd_AddGenreModal = () => {
    setShowAdd_AddGenreModal(true);
  };

  function onAddGenreToProduct(event) {
    var genre = document.getElementById("pick_genre").value;
    var state = [...selectedGenres];
    if (!state.includes(genre)) {
      state.push(genre);
    }

    setSelectedGenres(state);
    setShowAdd_AddGenreModal(false);
  }
  function onRemoveGenreFromProduct(event) {
    var genre = event.target.outerText;
    var state = [...selectedGenres];
    setSelectedGenres(state.filter((q) => q != genre.trim()));
  }
  //modal add author
  const [showAdd_AddAuthorModal, setShowAdd_AddAuthorModal] = useState(false);

  const handleCloseAdd_AddAuthorModal = () => {
    setShowAdd_AddAuthorModal(false);
  };
  const handleShowAdd_AddAuthorModal = () => {
    setShowAdd_AddAuthorModal(true);
  };

  function onAddAuthorToProduct(event) {
    var au = document.getElementById("pick_author").value;
    var state = [...selectedAuthors];
    if (!state.includes(au)) {
      state.push(au);
    }

    setSelectedAuthors(state);
    setShowAdd_AddAuthorModal(false);
  }
  function onRemoveAuthorFromProduct(event) {
    var au = event.target.outerText;
    var state = [...selectedAuthors];
    setSelectedAuthors(state.filter((q) => q != au.trim()));
  }
  function onPublisherChange(event) {
    var publisher = event.target.value;
    setSelectedPublisher(publisher);
    // console.log(publisher)
  }

  function onAddButtonClick(data) {
    // console.log(data);
    if (selectedGenres.length == 0) {
      toast.info("Thêm thể loại cho sản phẩm!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (selectedAuthors.length == 0) {
      toast.info("Thêm tác giả cho sản phẩm!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (selectedPublisher == null) {
      toast.info("Thêm nhà xuất bản cho sản phẩm!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setIsAdding(true);
    if (uploadImg) {
      upLoadImageToCloudinary(selectedImgUrl)
        .then((res) => {
          setselectedImgUrl(res.data.url);
          AddProduct(data,res.data.url);
        })
        .catch((e) => {
          console.log(e);
          setIsAdding(false);
          setShowAddModal(false);
        });
    } else {
      AddProduct(data);
    }
  }

  function AddProduct(data,url){
    var book = {
      title: data.title,
      description: data.description,
      imgUrl: url ? url : selectedImgUrl,
      price: data.price,
      publishYear: data.publishYear,
      numberOfPage: data.numberOfPage,
      genresString: selectedGenres,
      authorsString: selectedAuthors,
      publisherName: selectedPublisher,
    };

    AdminService.AddProduct(book)
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
        setSelectedGenres([]);
        setSelectedAuthors([]);
        setSelectedPublisher(null);
        setselectedImgUrl(defaultImgUrl);
        ReRender();
      });
  }
  //run first
  useEffect(() => {
    setIsLoading(true);
    ProductService.getGenre()
      .then((response) => {
        //console.log(response.data);
        setListGenre(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    AdminService.GetBooksForAdmin(
      genre_filter,
      orderby,
      sort,
      pageNumber,
      pageSize
    )
      .then((response) => {
        //console.log(response.data.result);
        setListProduct(response.data.result);
        setTotalPage(Math.ceil(Number(response.data.totalProduct / pageSize)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    ProductService.getAuthor()
      .then((response) => {
        //console.log(response.data);
        setListAuthor(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    ProductService.getPublisher()
      .then((response) => {
        //console.log(response.data);
        setListPublisher(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, [genre_filter, orderby, sort, pageNumber, pageSize, reRender]);

  function onGenreFilterChange(event) {
    setpageNumber(1);
    setGenre_filter(event.target.value);
  }
  function onOrderByFilterChange(event) {
    setpageNumber(1);
    setOrderby(event.target.value);
  }
  function onSortFilterChange(event) {
    setpageNumber(1);
    setSort(event.target.value);
  }
  function onPageSizeFilterChange(event) {
    setpageNumber(1);
    setPageSize(event.target.value);
  }
  function onPageNumberChange(event) {
    setpageNumber(event.target.value);
  }

  function onArrowPaginationClick(event) {
    var id = event.target.id.slice(0, 12);
    if (id == "pagination_r") {
      if (pageNumber < totalPage) {
        setpageNumber(pageNumber + 1);
      }
    } else {
      if (pageNumber > 1) {
        setpageNumber(pageNumber - 1);
      }
    }
  }
  function ReRender() {
    setReRender(!reRender);
  }


  const [searchType, setSearchType] = useState("Product");
  const [searchBy, setSearchBy] = useState("Name");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [currentResultPage, setCurrentResultPage] = useState(1)
  const [totalResultPage, setTotalResultPage] = useState(1)
  function onSearchTypeChange(event) {
    setSearchType(event.target.value);
  }
  function onSearchByChange(event) {
    setSearchBy(event.target.value);
  }
  function onKeywordChange(event) {
    setKeyword(event.target.value);
  }

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isSearching, setIsSearching] = useState(true);

  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  };
  const handleShowSearchModal = () => {
    setShowSearchModal(true);
    setIsSearching(true);
    GetSearchResult(1,4)
  };
  function GetSearchResult(pageNumber,pageSize){
    setCurrentResultPage(pageNumber)
    AdminService.GetSearchResult(searchType, searchBy, keyword, pageNumber, pageSize)
      .then((res) => {
        //console.log(res.data);
        setTotalResultPage(Math.ceil(Number(res.data.total / pageSize)))
        setSearchResult(res.data.result)
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleShowSearchModal();
    }
  }



  return (
    <Fragment>
      {!authorizing && (
        <Fragment>
          <AdminHeader></AdminHeader>
          <div className="w-100 h-100" style={{ backgroundColor: "#1E1E28" }}>
            <div className="container  py-3 ">
              <div className="card p-3">
                <p className="lead text-center mb-0 fw-bold fs-3 text-monospace">
                  {" "}
                  <i className="fas fa-file-invoice-dollar me-2"></i>Quản lý sản
                  phẩm
                </p>
              </div>
              <div className="row">
                <div className="col">
                  <div
                    className="div-center-content mt-3"
                    style={{ marginTop: -25 + "px", marginBottom: 15 + "px" }}
                    id="searchBarProduct"
                  >
                    <div className="w-100 my-2">
                      <div className="search">
                        <input
                          type="text"
                          className="searchTerm"
                          placeholder="Tìm kiếm..."
                          onKeyDown={handleKeyDown}
                          onChange={onKeywordChange}
                        ></input>
                        <button type="submit" className="searchButton" onClick={handleShowSearchModal}>
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-white fw-bold fs-5">
                        Tìm kiếm bằng :{" "}
                      </label>
                      <select className="form-select" defaultValue={"Name"}      onChange={onSearchByChange}>
                        <option value="Id">Id</option>
                        <option value="Price">Giá</option>
                        <option value="Name">Tên</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr className="text-white"></hr>
                <div className="d-flex flex-wrap justify-content-around ">
                  <div className="mb-3 row">
                    <label className="text-white">Trạng thái: </label>
                    <select
                      className="form-select"
                      defaultValue={"all"}
                      onChange={onGenreFilterChange}
                    >
                      <option value="all">Toàn bộ</option>
                      {listGenre.map((genre) => {
                        return (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 row">
                    <label className="text-white">Sắp xếp theo: </label>
                    <select
                      className="form-select"
                      defaultValue={"Id"}
                      onChange={onOrderByFilterChange}
                    >
                      <option value="Id">Id</option>
                      <option value="Title">Tên</option>
                      <option value="Price">Giá</option>
                    </select>
                  </div>
                  <div className="mb-3 row">
                    <label className="text-white">Asc/Desc: </label>
                    <select
                      className="form-select"
                      defaultValue={"Asc"}
                      onChange={onSortFilterChange}
                    >
                      <option value="Asc">Asc</option>
                      <option value="Desc">Desc</option>
                    </select>
                  </div>
                  <div className="mb-3 row">
                    <label className="text-white">Hiển thị: </label>
                    <select
                      className="form-select"
                      defaultValue={"5"}
                      onChange={onPageSizeFilterChange}
                    >
                      <option value="5">5</option>
                      <option value="2">2</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
                <hr className="text-white"></hr>
                <div className="container">
                  <div className="card bg-admin text-white">
                    <div className="card-header">
                      <div className="d-flex justify-content-between flex-wrap">
                        <div className="col-sm-12 ">
                          <h5 className="card-title">Bảng quản lý sản phẩm</h5>
                        </div>
                        <div className="col-sm-12 ">
                          <div className="btn-group mb-2">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleShowAddModal}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={ReRender}
                            >
                              <i className="fas fa-sync"></i>
                            </button>
                            <button type="button" className="btn btn-success">
                              <i className="fas fa-download"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body text-white">
                      <div className="table-responsive ">
                        <table className="table">
                          <thead className="text-primary">
                            <tr>
                              <th className="text-center">#</th>
                              <th>Sản phẩm</th>
                              <th>Giá</th>
                              <th>Nhà xuất bản</th>
                              <th>Tác giả</th>
                              <th>Thể loại</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          {!isLoading && listProduct.length > 0 && (
                            <tbody>
                              {listProduct.map((item, i) => {
                                return (
                                  <ProductTableItem
                                    item={item}
                                    key={i}
                                    reRender={ReRender}
                                    listAuthor={listAuthor}
                                    listGenre={listGenre}
                                    listPublisher={listPublisher}
                                  ></ProductTableItem>
                                );
                              })}
                            </tbody>
                          )}
                        </table>
                        {!isLoading && listProduct.length == 0 && (
                          <div className="d-flex justify-content-center">
                            <img
                              className="img-fluid"
                              alt="nodata"
                              src="https://ringxe.vn/static/imgs/nodata-found.png"
                            ></img>
                          </div>
                        )}
                        {isLoading && (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-info"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <p className="text monospace ms-2">
                              Đang xử lý xin chờ tí...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <div className="paginationsa:container">
                  <div
                    className="paginationsa:number arrow"
                    id="pagination_l"
                    onClick={onArrowPaginationClick}
                  >
                    <i
                      className="fas fa-chevron-left"
                      id="pagination_l_icon"
                    ></i>
                  </div>
                  <Pagination
                    totalPage={totalPage}
                    onPageNumberChange={onPageNumberChange}
                    pageNumber={pageNumber}
                  ></Pagination>
                  <div
                    className="paginationsa:number arrow"
                    id="pagination_r"
                    onClick={onArrowPaginationClick}
                  >
                    <i
                      className="fas fa-chevron-right"
                      id="pagination_r_icon"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      )}
      {authorizing && (
        <AdminLoading></AdminLoading>
      )}
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
      {/* add product modal - add genre */}
      <Modal
        show={showAdd_AddGenreModal}
        onHide={handleCloseAdd_AddGenreModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm thể loại cho sản phẩm </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Tên thể loại : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="(chọn từ danh sách hoặc thêm mới)..."
                  list="genres"
                  id="pick_genre"
                ></input>
                <datalist id="genres">
                  {listGenre.map((genre) => {
                    return (
                      <option value={genre.name} key={genre.id}>
                        {genre.name}
                      </option>
                    );
                  })}
                </datalist>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={handleCloseAdd_AddGenreModal}
          >
            Close
          </button>
          <button className="btn btn-success" onClick={onAddGenreToProduct}>
            Thêm
          </button>
        </Modal.Footer>
      </Modal>
      {/* add product modal - add author */}
      <Modal
        show={showAdd_AddAuthorModal}
        onHide={handleCloseAdd_AddAuthorModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tác giả cho sản phẩm </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Tên tác giả : </label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="(chọn từ danh sách hoặc thêm mới)..."
                  list="genres"
                  id="pick_author"
                ></input>
                <datalist id="genres">
                  {listAuthor.map((a) => {
                    return (
                      <option value={a.name} key={a.id}>
                        {a.name}
                      </option>
                    );
                  })}
                </datalist>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={handleCloseAdd_AddAuthorModal}
          >
            Close
          </button>
          <button className="btn btn-success" onClick={onAddAuthorToProduct}>
            Thêm
          </button>
        </Modal.Footer>
      </Modal>

      <SearchModal
        showSearchModal={showSearchModal}
        handleCloseSearchModal={handleCloseSearchModal}
        isSearching={isSearching}
        searchResult = {searchResult}
        searchType = {searchType}
        GetSearchResult = {GetSearchResult}
        currentResultPage = {currentResultPage}
        totalResultPage = {totalResultPage}
        listGenre={listGenre}
        listAuthor={listAuthor}
        listPublisher={listPublisher}
        reRender = {ReRender}
      ></SearchModal>
    </Fragment>
  );
}

export default AdminProduct;

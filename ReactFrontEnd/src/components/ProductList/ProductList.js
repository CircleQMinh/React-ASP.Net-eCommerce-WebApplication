import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductService from "../../api/ProductService";
import { PaginationPage } from "../Pagination";
import "./ProductList.css";
import ProductListItem from "./ProductListItem";

function ProductList(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [listProduct, setListProduct] = useState([]);
  const [listGenre, setListGenre] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [filterGenreList, setFilterGenreList] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState("0,99999999");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setIsLoading(true);
    ProductService.getProduct(
      pageNumber,
      pageSize,
      keyword,
      priceRangeFilter,
      getFilterGenreString(filterGenreList)
    )
      .then((response) => {
        //console.log(response.data);
        setListProduct(response.data.result);
        //console.log(Math.ceil(Number(response.data.totalProduct / 8)))
        setTotalPage(Math.ceil(Number(response.data.totalProduct / 8)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    ProductService.getGenre()
      .then((response) => {
        //console.log(response.data);
        setListGenre(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, [pageNumber, pageSize, keyword, filterGenreList, priceRangeFilter]);

  //  function
  function onPriceRangeFilterChange(event) {
    setPageNumber(1)
    setPriceRangeFilter(event.target.value);
  }
  function onGenreFilterChange(event) {
    setPageNumber(1)
    var genre = { name: event.target.value, id: event.target.id };
    if (genre.name != "all") {
      if (!filterGenreList.some(g=>g.name==genre.name)) {
       // console.log("chưa có thêm vào")
        setFilterGenreList((state) => [...state, genre]);
      } else {
        setFilterGenreList(filterGenreList.filter((q) => q.id != genre.id));
        //console.log("có rồi bỏ ra")
      }
    } else {
      setFilterGenreList([]);
      filterGenreList.forEach((element) => {
        document.getElementById(element.id).checked = false;
      });
    }
    console.log(filterGenreList);
  }
  function onSearchKeyWordChange(event) {
    setPageNumber(1)
    setKeyword(event.target.value);
  }
  function onPageNumberChange(page) {
    document.getElementById("searchBarProduct").scrollIntoView();
    setPageNumber(page);
  }
  function onMinPriceChange(event) {
    setMinPrice(event.target.value);
  }
  function onMaxPriceChange(event) {
    setMaxPrice(event.target.value);
  }
  function applyPriceRange(event) {
    event.preventDefault();
    setPageNumber(1)
    if (minPrice == "" || maxPrice == "") {
      alert("Khoảng giá chưa hợp lệ");
    } else {
      setPriceRangeFilter(minPrice + "," + maxPrice);
    }
  }

  function resetFilter(){
    filterGenreList.forEach((genre)=>{
      var cb = document.getElementById(`${genre.id}`);
      cb.checked = false
    })
    setFilterGenreList([])
    setKeyword("")
    setPriceRangeFilter("0,99999999")
    setPageNumber(1)
  }

  let productListContent = listProduct.map((item) => {
    return (
      <Fragment key={item.id}>
        <ProductListItem item={item}></ProductListItem>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Container fluid>
        <div className="row">
          <div className="col">
            <p className="lead text-monospace text-center mt-5">
              <i className="fas fa-search"></i> Nhập tên sản phẩm bạn cần tìm
              kiếm !
            </p>

            <div
              className="d-flex justify-content-center"
              style={{ marginBottom: 15 + "px" }}
              id="searchBarProduct"
            >
              <div className="wrap">
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Bạn đang tìm sản phẩm nào?"
                    value={keyword}
                    onChange={onSearchKeyWordChange}
                  />
                  <button className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                  <button className="searchButton ms-2" onClick={resetFilter}>
                    <i className="fa-solid fa-rotate-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
              <hr />
            </div>
            <div className="container-fluid ">
              <div className="row">
                <div
                  className="col-3 border-end border-secondary"
                  id="filter_search"
                >
                  <h4>Theo danh mục</h4>
                  <div className="genre_filter">
                    <form>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="all"
                          name="allCate"
                          checked={filterGenreList.length == 0}
                          onChange={onGenreFilterChange}
                        />
                        <label className="form-check-label">Toàn bộ</label>
                      </div>

                      {listGenre.map((genre) => {
                        return (
                          <div className="form-check" key={genre.id}>
                            <input
                              id={`checkbox_genre_${genre.id}`}
                              className="form-check-input"
                              type="checkbox"
                              onChange={onGenreFilterChange}
                              value={genre.name}
                            />
                            <label className="form-check-label">
                              {genre.name}
                            </label>
                          </div>
                        );
                      })}
                    </form>
                  </div>
                  <hr></hr>

                  <h4>Giá</h4>
                  <form>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault1"
                        value="0,99999999"
                        name="pr1"
                        checked={priceRangeFilter == "0,99999999"}
                        onChange={onPriceRangeFilterChange}
                      />
                      <label className="form-check-label">Toàn bộ</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault2"
                        value="0,20000"
                        name="pr2"
                        onChange={onPriceRangeFilterChange}
                        checked={priceRangeFilter == "0,20000"}
                      />
                      <label className="form-check-label">Dưới 20.000</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault3"
                        value="20000,40000"
                        name="pr3"
                        onChange={onPriceRangeFilterChange}
                        checked={priceRangeFilter == "20000,40000"}
                      />
                      <label className="form-check-label">
                        Từ 20.000 đến 40.000
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault4"
                        value="40000,120000"
                        name="pr4"
                        onChange={onPriceRangeFilterChange}
                        checked={priceRangeFilter == "40000,120000"}
                      />
                      <label className="form-check-label">
                        Từ 40.000 đến 120.000
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault5"
                        value="120000,99999999"
                        name="pr5"
                        onChange={onPriceRangeFilterChange}
                        checked={priceRangeFilter == "120000,99999999"}
                      />
                      <label className="form-check-label">Trên 120.000</label>
                    </div>
                  </form>
                  <hr />

                  <h4>Khoảng giá</h4>
                  <form>
                    <div className="form-check ">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Từ
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="từ"
                          name="minPrice"
                          onChange={onMinPriceChange}
                          value={minPrice}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Đến
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="đến"
                          name="maxPrice"
                          onChange={onMaxPriceChange}
                          value={maxPrice}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <button
                          onClick={applyPriceRange}
                          className="btn btn-primary"
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
                <div className="col col-md-9">
                  <div className="container-fluid">
                    <div className="d-flex justify-content-center ">
                      {keyword != "" && (
                        <h4 className="tag-search-h4">
                          <span className="badge rounded-pill bg-info mx-2 hover_badge">
                            Từ khóa : {keyword}
                            <i className="ms-2 far fa-times-circle"></i>
                          </span>
                        </h4>
                      )}
                    </div>
                    <div className="row flex-row flex-wrap justify-content-center">
                      {listProduct.length > 0 && productListContent}
                      {isLoading && (
                        <Fragment>
                          <div className="loading_spinner mb-5">
                            <div
                              className="spinner-border text-info"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <p className="text-center text-monospace mt-2">
                              Đang tải sản phẩm...
                            </p>
                          </div>
                        </Fragment>
                      )}
                      {listProduct.length == 0 && !isLoading && (
                        <Fragment>
                          <div className="loading_spinner mb-5">
                            <img
                              className="img_no_product"
                              alt="no-product"
                              src="https://kharidbikribazar.com/photos/nproduct.png"
                            ></img>
                          </div>
                        </Fragment>
                      )}
                    </div>
                    <div className="d-flex justify-content-center">
                      <PaginationPage count={totalPage} onChangePage={onPageNumberChange} currentPage={pageNumber}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default ProductList;

function AlertA() {
  console.log("A");
  alert("A");
}
function getFilterGenreString(genres) {
  if (genres.length == 0) {
    return null;
  }
  var string_genre = "";
  genres.forEach((element) => {
    string_genre += element.name;
    string_genre += ",";
  });
  return string_genre.slice(0, string_genre.length - 1);
}

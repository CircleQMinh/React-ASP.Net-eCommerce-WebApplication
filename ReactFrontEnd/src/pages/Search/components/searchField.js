import "./ProductList.css";
import { Button } from "react-bootstrap";

export const SearchField = ({onSearchKeyWordChange, resetFilter, keyword}) => {
  return (
    <>
      <p className="lead text-monospace text-center mt-5">
        <i className="fas fa-search"></i> Nhập tên sản phẩm bạn cần tìm kiếm !
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
    </>
  );
};

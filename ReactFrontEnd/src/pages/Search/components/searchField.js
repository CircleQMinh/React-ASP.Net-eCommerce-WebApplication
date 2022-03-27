import "./ProductList.css";
import { Button } from "react-bootstrap";

export const SearchField = (props) => {
  const { onSearchKeyWordChange, resetFilter, keyword, handleSearch } = props;

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch && handleSearch()
    }
  };

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
              onKeyDown={handleKeyEnter}
            />
            <button className="searchButton btn btn-primary" onClick={handleSearch}>
              <i className="fa fa-search"></i>
            </button>
            <button className="searchButton ms-2 btn btn-primary" onClick={resetFilter}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

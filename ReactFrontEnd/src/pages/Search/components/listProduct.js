import React, { Fragment } from "react";
import { ProductInfo } from "../../../components/Product/ProductInfo";
import { PaginationPage } from "../../../components/Pagination";
import "./ProductList.css";

export const ListProductComponent = (props) => {
  const {
    keyword,
    listProduct,
    isLoading,
    totalPage,
    onPageNumberChange,
    pageNumber,
  } = props;
  return (
    <>
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
            {listProduct.length > 0 &&
              !isLoading &&
              listProduct.map((item) => (
                <Fragment key={item.id}>
                  <div
                    className="col col-xs-8 col-md-6 col-lg-4 col-xl-3 "
                    style={{ paddingBottom: 24 }}
                  >
                    <ProductInfo book={item} />
                  </div>
                </Fragment>
              ))}
            {isLoading && (
              <div className="loading_spinner mb-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-center text-monospace mt-2">
                  Đang tải sản phẩm...
                </p>
              </div>
            )}
            {listProduct.length == 0 && !isLoading && (
              <div className="loading_spinner mb-5">
                <img
                  className="img_no_product"
                  alt="no-product"
                  src="https://kharidbikribazar.com/photos/nproduct.png"
                ></img>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <PaginationPage
              count={totalPage}
              onChangePage={onPageNumberChange}
              currentPage={pageNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

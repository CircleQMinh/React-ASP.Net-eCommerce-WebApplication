import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductService from "../../api/ProductService";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ProductInfo } from "../Product/ProductInfo";

function AuthorBook() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const [authorName, setAuthorName] = useState(name);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  console.log(name); // 'name'

  useEffect(() => {
    if (name) {
      ProductService.getAuthorBook(name, 1, 99)
        .then((res) => {
          console.log(res.data.result);
          setBooks(res.data.result);
          console.log(res.data.totalProduct);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/error");
    }
  }, []);

  return (
    <Fragment>
      <Header></Header>
      <div className="card text-center">
        <div className="card-header fs-3">Tác giả - {authorName}</div>
      </div>
      <div className="container mt-2">
        <h2 className="text-center text-monospace lead">
          <span className="text-center">
            <i className="fa-solid fa-star me-2"></i> Các sách của tác giả này
          </span>
        </h2>
        <hr></hr>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {books.length > 0 &&
          !isLoading &&
          books.map((item) => (
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
        {books.length == 0 && !isLoading && (
          <div className="loading_spinner mb-5">
            <img
              className="img_no_product"
              alt="no-product"
              src="https://kharidbikribazar.com/photos/nproduct.png"
            ></img>
          </div>
        )}
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default AuthorBook;

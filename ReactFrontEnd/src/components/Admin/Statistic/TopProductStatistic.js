import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import AdminService from "../../../api/AdminService";
import TopProductChart from "../Chart/TopProductChart";

function TopProductStatistic() {
  const defaultImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

  const [topProduct, setTopProduct] = useState([
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
    { book: { title: "Placeholder 1", imgUrl: defaultImgUrl }, sales: 0 },
  ]);

  const [numberOfProduct, setNumberOfProduct] = useState(10);

  function ReloadTopProduct(number) {
    AdminService.GetTopProductStatistic(number)
      .then((res) => {
        setTopProduct(res.data.result);
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }
  useEffect(() => {
    console.log("mounted")
    ReloadTopProduct(numberOfProduct);
  }, []);

  return (
    <Fragment>
      <div className="row my-2" id="topProductChart" style={{backgroundColor: "#FFF", marginLeft: "0px", marginRight: "0px"}}>
        <div className="lead border border-3 p-3 lh-1 fw-bold">
          <i className="fa-solid fa-chart-line me-2"></i> Thống kê sản phẩm bán
          chạy nhất
          <button
              className="btn btn-sm btn-primary float-end border border-2"
              onClick={ReloadTopProduct(numberOfProduct)}
            >
              <i className="fa-solid fa-arrows-rotate me-2"> </i>Tải dữ liệu
            </button>
            <hr></hr>
          <div className="container" style={{ height: 500 + "px" }}>
            <TopProductChart productData={topProduct}></TopProductChart>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TopProductStatistic;

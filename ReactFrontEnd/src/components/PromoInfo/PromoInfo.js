import React, { Fragment, useState, useEffect } from "react";
import { formatDate } from "../../helper/formatDate";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Breadcrumb } from "../BreadCrumb";
import AdminService from "../../api/AdminService";
import NumberFormat from "react-number-format";
function PromoInfo() {
  const params = useParams();
  const navigate = useNavigate();
  //   console.log(params.id);
  const id = params.id;
  const { state } = useLocation();
  const promotion = state;
  //   console.log(promotion);
  if (promotion == null || promotion == undefined) {
    window.location.href = "/";
  }
  const [isLoading, setIsLoading] = useState(true);
  const [promoInfos, setpromoInfos] = useState(promotion?.promoInfos);

  useEffect(() => {
    setIsLoading(true);
    AdminService.GetPromotionInfosForAdmin(id)
      .then((response) => {
        setpromoInfos(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {" "}
      <Header></Header>
      <Breadcrumb
        list={[{ path: "/", name: "Home" }]}
        title="Chương trình khuyến mãi"
      />
      {!isLoading && (
        <div className="container w-75">
          <div className="row">
            <div className="col-sm-12">
              <div className="article-main">
                <h1 className="article-title h2">{promotion.name}</h1>
                <div className="card-subtitle text-gray my-3">
                  <i className="fas fa-calendar-check me-2"></i>
                  Ngày bắt đầu :{" "}
                  {formatDate(
                    new Date(promotion.startDate + "Z"),
                    "dd-MM-yyyy"
                  )}
                  <br></br>
                  <i className="fas fa-ban me-2"></i>
                  Ngày kết thúc :{" "}
                  {formatDate(new Date(promotion.endDate + "Z"), "dd-MM-yyyy")}
                </div>
                <blockquote>
                  <p>{promotion.description}</p>
                </blockquote>

                <p className="text-center">
                  <img
                    className="w-75"
                    src={promotion.imgUrl}
                    alt="Mua-rau-cu-qua-voi-gia-1k-web"
                  />
                </p>
                <p>
                  Từ ngày{" "}
                  <span>
                    <strong>
                      {" "}
                      {formatDate(
                        new Date(promotion.startDate + "Z"),
                        "dd-MM-yyyy"
                      )}
                    </strong>
                  </span>{" "}
                  đến ngày{" "}
                  <strong>
                    <span>
                      {" "}
                      {formatDate(
                        new Date(promotion.endDate + "Z"),
                        "dd-MM-yyyy"
                      )}
                    </span>
                  </strong>
                  , tại Circle's Shop sẽ diễn ra chương trình khuyến mãi “
                  <strong>
                    <span className="text-promo">
                      Tên chương trình khuyến mãi
                    </span>
                  </strong>
                  " với các sản phẩm sau:
                </p>
                <div className="table-responsive">
                  <table className="table ">
                    <thead className="thead-dark">
                      <tr>
                        <th className="text-monospace w-10">#</th>
                        <th className="text-monospace w-10">Sản phẩm</th>
                        <th className="text-monospace w-30">Tên</th>
                        <th className="text-monospace w-20">Giá gốc</th>
                        <th className="text-monospace w-20">Giá khuyến mãi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promoInfos.map((od, i) => {
                        return (
                          <tr>
                            <td className="text-monospace">{i+1}</td>
                            <td className="text-monospace">
                              <img src={od.book.imgUrl} className="btn_cart" />
                            </td>
                            <td className="text-monospace">
                              <a href={`/book/${od.book.id}`} target="_blank">
                                {od.book.title}
                              </a>
                            </td>
                            <td className="text-monospace">
                              {" "}
                              {od.book.price}{" "}
                              <span className="currency-dis">đ</span>
                            </td>

                            {od.promotionAmount != null && (
                              <td className="text-monospace">
                                <NumberFormat
                                  value={od.book.price}
                                  className="text-center text-danger text-decoration-line-through me-2"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={"đ"}
                                  renderText={(value, props) => (
                                    <span {...props}>{value}</span>
                                  )}
                                />
                                <NumberFormat
                                  value={od.book.price - od.promotionAmount}
                                  className="text-center text-danger text-decoration-underline  "
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={"đ"}
                                  renderText={(value, props) => (
                                    <span {...props}>{value}</span>
                                  )}
                                />
                                <span className="badge rounded-pill bg-danger ms-3">
                                  {`- ${od.promotionAmount} đ`}
                                </span>
                              </td>
                            )}
                            {od.promotionPercent != null && (
                              <td>
                                <NumberFormat
                                  value={od.book.price}
                                  className="text-center text-danger text-decoration-line-through me-2"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={"đ"}
                                  renderText={(value, props) => (
                                    <span {...props}>{value}</span>
                                  )}
                                />
                                <NumberFormat
                                  value={
                                    od.book.price -
                                    (od.book.price * od.promotionPercent) / 100
                                  }
                                  className="text-center text-danger text-decoration-underline "
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={"đ"}
                                  renderText={(value, props) => (
                                    <span {...props}>{value}</span>
                                  )}
                                />
                                <span className="badge rounded-pill bg-success ms-3">
                                  -{od.promotionPercent}%
                                </span>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p>
                  Áp dụng giao hàng miễn phí cho khách hàng có hóa đơn từ{" "}
                  <span className="text-promo">
                    200.000đ trở lên 
                  </span>
                </p>
                <p>
                  Các khách hàng thân thương hãy nhanh chóng đặt hàng đến
                  Circle's Shop mua ngay những sản phẩm trên với giá{" "}
                  <span className="text-promo">
                    <strong>khuyến mãi !!</strong>
                  </span>
                </p>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </Fragment>
  );
}

export default PromoInfo;

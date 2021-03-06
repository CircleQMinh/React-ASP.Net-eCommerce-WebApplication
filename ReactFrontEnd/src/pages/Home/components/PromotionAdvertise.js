import React, { Fragment, useEffect, useState } from "react";
import AdminService from "../../../api/AdminService";
import { formatDate } from "../../../helper/formatDate";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../../components/Loading";
import { TitleNav } from "./TitleNav";
import './styles.css'

function PromotionAdvertise() {
  const [promotions, setPromotions] = useState([]);
  const [count, setCount] = useState(5)
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    AdminService.GetPromotionForAdmin(1, "Id", "Asc", 1, 99,true)
      .then((response) => {
        //console.log(response.data)
        setPromotions(response.data.result);
        setCount(response.data.total)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  function toPromoInfo(){
    var data = promotions[currentIndex];
    navigate(`/promotion/${promotions[currentIndex].id}`,{state:data})
  }

  return (
    <Fragment>
      <div className="containerDiv">
        <TitleNav 
          title={" Chương trình khuyến mãi đang diễn ra! "} 
          icon={ <i className="fas fa-bullhorn  animate__animated animate__jello animate__infinite"></i>} 
        />
        {promotions.length > 0 ? (
          <div className="row d-flex justify-content-center mt-3 promotionContainer">
            <div
              className="animate__animated animate__rotateIn "
              onClick={toPromoInfo}
            >
              <article className="postcard postCardContainer">
                <a
                  className="postcard__img_link"
                  href={`/promotion/${promotions[currentIndex].id}`}
                >
                  <img
                    className="postcard__img"
                    src={promotions[currentIndex].imgUrl}
                    alt="Title"
                  />
                </a>
                <div className="postcard__text">
                  <h1 className="postcard__title blue text-tron">
                    <a
                      href={`/promotion/${promotions[currentIndex].id}`}
                    >
                      {promotions[currentIndex].name}
                    </a>
                  </h1>
                  <div className="postcard__subtitle small">
                    <time>
                      <i className="fas fa-calendar-alt mr-2"></i> Ngày bắt đầu
                      :
                      {formatDate(
                        new Date(promotions[currentIndex].startDate + "Z"),
                        "dd-MM-yyyy HH:mm:ss"
                      )}
                    </time>
                    <br />
                    <time>
                      <i className="fas fa-ban mr-2"></i> Ngày kết thúc :
                      {formatDate(
                        new Date(promotions[currentIndex].endDate + "Z"),
                        "dd-MM-yyyy HH:mm:ss"
                      )}
                    </time>
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt text-tron">
                    {promotions[currentIndex].description}
                  </div>

                  <button className="btn buttonPromotion">
                    Xem ngay <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </article>
            </div>

            <div className="row justify-content-center my-4">
              <div className="col d-flex justify-content-center">
                <Fragment>
                  {Array.from(Array(count), (e, i) => {
                    if (i == currentIndex) {
                      return (
                        <i
                          key={`promolist_${i}`}
                          className="fas fa-square fa-lg animate__animated animate__bounce animate__infinite mx-2"
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={`promolist_${i}`}
                          className="far fa-square fa-lg mx-2"
                          onClick={() => {
                            setCurrentIndex(i);
                          }}
                        ></i>
                      );
                    }
                  })}
                </Fragment>
              </div>
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </Fragment>
  );
}

export default PromotionAdvertise;

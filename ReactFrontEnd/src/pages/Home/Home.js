import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";
import SlickSlider from "../../components/SlickSlider/SlickSlider";
import AdvertiseSlide from "./AdvertiseSlide";
import FirstAPI from "../../api/FirstAPI";
import ProductService from "../../api/ProductService";
import { limitGetProduct } from "../../utils/constant";
import { LoadingScreen } from "../../components/Loading";
import { Evaluate } from "./components/Evaluate";
import styles from "../Contact/contact.module.css";
import "./Home.css";
import PromotionAdvertise from "./components/PromotionAdvertise";
import { SlickProducts } from "./components/ListProduct";

function Home(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [randomProducts, setRandomProduct] = useState([]);
  const [lateProducts, setLateProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const redirectRegister = () => {
    window.scrollTo(0, 0);
    navigate(`/register`);
  };

  const getDataProduct = async () => {
    //get products random
    ProductService.getRandomProducts(limitGetProduct.RANDOM)
      .then((response) => {
        setRandomProduct(response?.data?.result || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});

    ProductService.getPopularProducts(limitGetProduct.POPULAR)
      .then((response) => {
        if (response?.data?.result?.length > 0) {
          const productsPopular = response?.data?.result.map(
            (product) => product.book
          );
          setPopularProducts(productsPopular);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});

    ProductService.getLateProducts(limitGetProduct.LATE)
      .then((response) => {
        setLateProducts(response?.data?.result || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const title = (
    <Container className="mt-4">
      <hr></hr>
      <p className="text-monospace">
        FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready to
        ship & 3.6 million eBooks to download right now. Curbside pickup
        available in most stores!
      </p>
      <hr></hr>
    </Container>
  );

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <Fragment>
      <Header></Header>
      <div className="home-wrapper background_cover_1">
        <AdvertiseSlide></AdvertiseSlide>
        <SlickProducts products={popularProducts} title={" C??c s???n ph???m n???i b???t "} />
        <SlickProducts products={randomProducts} title={" G???i ?? cho b???n "} />
        <SlickProducts products={lateProducts} title={" M???i nh???t "} />
        <PromotionAdvertise></PromotionAdvertise>
        <Evaluate />

        <div className={`${styles.bodyContact}`} style={{ backgroundColor: "#FFF" }}>
          <div className={styles.infoWrapper}>
            <div className={`${styles.content} mb-5 px-2`}>
              <span style={{ fontWeight: "bold" }}>Circle's Shop</span> C???a h??ng
              mua s??ch online TP.HCM. Chuy??n b??n c??c lo???i s??ch, truy???n tranh v??
              ti???u thuy???t. V???i r???t nhi???u ?????u s??ch, ??i???u quan tr???ng l?? cung c???p
              cho kh??ch h??ng m???t c??ch d??? d??ng ????? t??m th???y ch??nh x??c nh???ng cu???n
              s??ch h??? ??ang t??m ki???m. C??ng c??? t??m ki???m c???a ch??ng t??i cho ph??p
              kh??ch h??ng t??m s??ch theo t??n s??ch, t??c gi??? ho???c t??? kh??a ch??? trong
              v??i gi??y.
            </div>

            <div className="container pt-2">
              <div className={`row ${styles.rowWrapper}`}>
                <div className="container">
                  <div className="row ">
                    <div className="col-12 col-md-6">
                      <div>
                        <b>??a d???ng</b>
                        <p>
                          Ch??ng t??i c?? h??n 13 tri???u ?????u s??ch ????? b???n l???a ch???n, t???
                          nh???ng cu???n s??ch ban ?????u ?????n nh???ng t??c ph???m v??n h???c
                          kinh ??i???n m???i th???i ?????i.
                        </p>
                        <b>Phong ph??</b>
                        <p>
                          S??ch c?? th?????ng l?? nh???ng kho b??u kh??ng c??n in ho???c
                          hi???m. V???i Danh s??ch mong mu???n, b???n c?? th??? ch???n nh???n
                          th??ng b??o ngay khi ch??ng t??i t??m th???y b???n sao, xem t???n
                          su???t ch??ng t??i t??m th???y nh???ng t???a s??ch hi???m v?? xem ai
                          kh??c quan t??m.
                        </p>
                        <b>FREE Shipping &amp; H??n th??? n???a!</b>
                        <p>
                          Khi b???n t??m th???y nh???ng cu???n s??ch m??nh mu???n, ch??ng t??i
                          s??? giao c??c ????n ?????t h??ng ????? ??i???u ki???n ?????n t???n nh?? MI???N
                          PH?? trong bao b?? c?? th??? t??i ch??? 100%. N???u kh??ng c?? nhu
                          c???u mua s??ch, ch??ng t??i s??? quy??n g??p cho t??? ch???c t???
                          thi???n ho???c ch??ng t??i s??? t??i ch??? n??.
                        </p>
                        <p>
                          <button
                            onClick={() => {
                              window.scrollTo(0, 0);
                              navigate(`/contact`);
                            }}
                            className="btn btn-primary"
                          >
                            Th??ng tin th??m v??? ch??ng t??i
                          </button>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 p-2">
                      <img
                        className="img-fluid"
                        src="https://ielts24h.edu.vn/upload/files/images/fullsize/2021/08/16/ielts-speaking-part-2-topic-book-bai-mau-chu-de-sach.jpg"
                        alt="..."
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;

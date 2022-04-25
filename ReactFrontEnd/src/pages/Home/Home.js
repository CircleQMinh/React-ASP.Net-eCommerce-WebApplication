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

import "./Home.css";
import PromotionAdvertise from "./components/PromotionAdvertise";

function Home(props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [randomProducts, setRandomProduct] = useState([]);
  const [lateProducts, setLateProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const getDataProduct = async () => {
    //get products random
    ProductService.getRandomProducts(limitGetProduct.RANDOM)
      .then((response) => { setRandomProduct(response?.data?.result || []) })
      .catch((error) => { console.log(error); })
      .finally(() => { });

    ProductService.getPopularProducts(limitGetProduct.POPULAR)
      .then((response) => { 
        if(response?.data?.result?.length > 0) {
          const productsPopular = response?.data?.result.map(product => product.book )
          setPopularProducts(productsPopular)
        }
      })
      .catch((error) => { console.log(error); })
      .finally(() => { });

    ProductService.getLateProducts(limitGetProduct.LATE)
      .then((response) => { setLateProducts(response?.data?.result || []) })
      .catch((error) => { console.log(error); })
      .finally(() => { });
  }

  const title = <Container className="mt-5">
      <hr></hr>
      <p className="text-monospace">
        FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready
        to ship & 3.6 million eBooks to download right now. Curbside pickup
        available in most stores!
      </p>
      <hr></hr>
    </Container>

  useEffect(()=>{
    getDataProduct()
  },[])


  return (
    <Fragment>
      <Header></Header>
      <AdvertiseSlide></AdvertiseSlide>
      <div className="container mt-5">
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Nổi bật
          </h3>
        </div>
        <hr></hr>
        {popularProducts?.length > 0 
          ?  
          <SlickSlider items={popularProducts}/>
          : 
          <LoadingScreen/>
        }
      </div>
      <div className="container mt-5">
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Gợi ý cho bạn
          </h3>
        </div>
        <hr></hr>
        {randomProducts?.length > 0 
          ?
          <SlickSlider items={randomProducts}></SlickSlider>
          :
          <LoadingScreen/>
        }
      </div>
      <div className="container mt-5">
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Mới nhất
          </h3>
        </div>
        <hr></hr>
        {lateProducts?.length > 0 
          ?
          <SlickSlider items={lateProducts}></SlickSlider>
          :
          <LoadingScreen/>
        }
      </div>
      <PromotionAdvertise></PromotionAdvertise>
      <Evaluate/>

      <div className="container">
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Về chúng tôi
          </h3>
        </div>
        <hr></hr>
      </div>
      <div className="container">
        <div className="row border border-4">
          <div className="col-12 col-md-6">
            <div>
              <b>Selection</b>
              <p>
                {/* We have more than 13 million titles to choose from, from the
                earliest <Link to="/b/childrens-books/">board books</Link> to
                the all-time classNameics of{" "}
                <Link to="/b/literature-and-fiction/">literature</Link>. */}
                Chúng tôi có hơn 13 triệu đầu sách để bạn lựa chọn, 
                từ những cuốn sách ban đầu đến những tác phẩm văn học kinh điển mọi thời đại.
              </p>
              <b>Purchasing Power</b>
              <p>
                Sách cũ thường là những kho báu không còn in hoặc hiếm. 
                Với Danh sách mong muốn, bạn có thể chọn nhận thông báo ngay 
                khi chúng tôi tìm thấy bản sao, xem tần suất chúng tôi tìm 
                thấy những tựa sách hiếm và xem ai khác quan tâm.
              </p>
              <b>FREE Shipping &amp; More</b>
              <p>
                Khi bạn tìm thấy những cuốn sách mình muốn, chúng tôi sẽ giao 
                các đơn đặt hàng đủ điều kiện đến tận nhà MIỄN PHÍ trong 
                bao bì có thể tái chế 100%. Nếu không có nhu cầu mua sách, 
                chúng tôi sẽ quyên góp cho tổ chức từ thiện hoặc chúng tôi sẽ tái chế nó.
              </p>
              <p>
                <button 
                  onClick={() => { 
                    window.scrollTo(0,0);
                    navigate(`/contact`)
                  }} 
                  className="btn btn-primary"
                >
                  Thông tin thêm về chúng tôi
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
      <hr></hr>
      <Footer></Footer>
    </Fragment>
  );
}

export default Home;

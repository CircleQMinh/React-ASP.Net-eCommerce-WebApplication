import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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

function Home(props) {
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

  useEffect(()=>{
    getDataProduct()
  },[])


  return (
    <Fragment>
      <Header></Header>
      <AdvertiseSlide></AdvertiseSlide>

      <Container className="mt-5">
        <hr></hr>
        <p className="text-monospace">
          FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready
          to ship & 3.6 million eBooks to download right now. Curbside pickup
          available in most stores!
        </p>
        <hr></hr>
      </Container>

      <div className="container">
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Nổi bật
          </h3>
        </div>
        {popularProducts?.length > 0 
          ?  
          <SlickSlider items={popularProducts}/>
          : 
          <LoadingScreen/>
        }
       
      </div>
      <Container className="mt-5">
        <hr></hr>
        <p className="text-monospace">
          FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready
          to ship & 3.6 million eBooks to download right now. Curbside pickup
          available in most stores!
        </p>
        <hr></hr>
      </Container>
      <Container fluid>
        <ProductList></ProductList>
      </Container>

      <Evaluate/>

      <Container className="mt-5">
        <hr></hr>
        <p className="text-monospace">
          FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready
          to ship & 3.6 million eBooks to download right now. Curbside pickup
          available in most stores!
        </p>
        <hr></hr>
      </Container>
      <div className="container">
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Gợi ý cho bạn
          </h3>
        </div>
        {randomProducts?.length > 0 
          ?
          <SlickSlider items={randomProducts}></SlickSlider>
          :
          <LoadingScreen/>
        }
      </div>
      <Container className="mt-5">
        <hr></hr>
        <p className="text-monospace">
          FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready
          to ship & 3.6 million eBooks to download right now. Curbside pickup
          available in most stores!
        </p>
        <hr></hr>
      </Container>
      <div className="container">
        <div className="d-flex justify-content-center">
          <h3 className="text-monospace text-tron">
            <i className="far fa-star"></i> Mới nhất
          </h3>
        </div>
        {lateProducts?.length > 0 
          ?
          <SlickSlider items={lateProducts}></SlickSlider>
          :
          <LoadingScreen/>
        }
      </div>

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
                We have more than 13 million titles to choose from, from the
                earliest <Link to="/b/childrens-books/">board books</Link> to
                the all-time classNameics of{" "}
                <Link to="/b/literature-and-fiction/">literature</Link>.
              </p>
              <b>Purchasing Power</b>
              <p>
                Used books are often treasures that are out-of-print or rare.
                With Wish Lists you can choose to be notified the instant we
                find a copy, see how often we find rare titles, and see who else
                is interested.
              </p>
              <b>FREE Shipping &amp; More</b>
              <p>
                When you've found the books you want we'll ship qualifying
                orders to your door for <strong>FREE</strong> in 100% recyclable
                packaging. If there is no demand for a book, we will donate it
                to charity, or we'll recycle it.
              </p>
              <p>
                <Link to="/aboutus.aspx" className="btn btn-primary ">
                  More About Us
                </Link>
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

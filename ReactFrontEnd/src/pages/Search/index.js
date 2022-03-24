import React, { Fragment } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductList from "../../components/ProductList/ProductList";
import { Container } from "react-bootstrap";
import ProductService from "../../api/ProductService";
import { LoadingScreen } from "../../components/Loading";
import "./SearchResult.css";

export const SearchPage = (props) => {
  return (
    <>
      <Header></Header>
      <Container fluid className="pt-3 pb-5">
        <ProductList></ProductList>
      </Container>
      <Footer></Footer>
    </>
  );
};

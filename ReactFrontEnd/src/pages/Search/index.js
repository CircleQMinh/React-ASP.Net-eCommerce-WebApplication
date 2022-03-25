import React, { Fragment, useEffect, useState, useCallback } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import ProductService from "../../api/ProductService";
import "./SearchResult.css";

import { SearchField } from "./components/searchField";
import { FilterProduct } from "./components/filterProduct";
import { ListProductComponent } from "./components/listProduct";

export const SearchPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [listProduct, setListProduct] = useState([]);
  const [listGenre, setListGenre] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [filterGenreList, setFilterGenreList] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState("0,99999999");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setIsLoading(true);
    ProductService.getProduct(
      pageNumber,
      pageSize,
      keyword,
      priceRangeFilter,
      getFilterGenreString(filterGenreList)
    )
      .then((response) => {
        //console.log(response.data);
        setListProduct(response.data.result);
        //console.log(Math.ceil(Number(response.data.totalProduct / 8)))
        setTotalPage(Math.ceil(Number(response.data.totalProduct / 8)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    ProductService.getGenre()
      .then((response) => {
        //console.log(response.data);
        setListGenre(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, [pageNumber, pageSize, keyword, filterGenreList, priceRangeFilter]);

  //  function
  function onPriceRangeFilterChange(event) {
    setPageNumber(1);
    setPriceRangeFilter(event.target.value);
  }

  function onGenreFilterChange(event) {
    setPageNumber(1);
    var genre = { name: event.target.value, id: event.target.id };
    if (genre.name != "all") {
      if (!filterGenreList.some((g) => g.name == genre.name)) {
        // console.log("chưa có thêm vào")
        setFilterGenreList((state) => [...state, genre]);
      } else {
        setFilterGenreList(filterGenreList.filter((q) => q.id != genre.id));
        //console.log("có rồi bỏ ra")
      }
    } else {
      setFilterGenreList([]);
      filterGenreList.forEach((element) => {
        document.getElementById(element.id).checked = false;
      });
    }
    console.log(filterGenreList);
  }

  function onSearchKeyWordChange(event) {
    setPageNumber(1);
    setKeyword(event.target.value);
  }
  function onPageNumberChange(page) {
    document.getElementById("searchBarProduct").scrollIntoView();
    setPageNumber(page);
  }

  function onMinPriceChange(event) {
    setMinPrice(event.target.value);
  }

  function onMaxPriceChange(event) {
    setMaxPrice(event.target.value);
  }

  function applyPriceRange(event) {
    event.preventDefault();
    setPageNumber(1);
    if (minPrice == "" || maxPrice == "") {
      alert("Khoảng giá chưa hợp lệ");
    } else {
      setPriceRangeFilter(minPrice + "," + maxPrice);
    }
  }

  function resetFilter() {
    filterGenreList.forEach((genre) => {
      var cb = document.getElementById(`${genre.id}`);
      cb.checked = false;
    });
    setFilterGenreList([]);
    setKeyword("");
    setPriceRangeFilter("0,99999999");
    setPageNumber(1);
  }

  return (
    <>
      <Header></Header>
      <Container fluid className="pt-3 pb-5">
        <Container fluid>
          <div className="row">
            <div className="col">
              <SearchField
                onSearchKeyWordChange={onSearchKeyWordChange}
                resetFilter={resetFilter}
                keyword={keyword}
              />
              <hr />
            </div>
          </div>
          <div className="container-fluid ">
            <div className="row">
              <FilterProduct
                onGenreFilterChange={onGenreFilterChange}
                listGenre={listGenre}
                filterGenreList={filterGenreList}
                onPriceRangeFilterChange={onPriceRangeFilterChange}
                priceRangeFilter={priceRangeFilter}
                onMinPriceChange={onMinPriceChange}
                minPrice={minPrice}
                onMaxPriceChange={onMaxPriceChange}
                maxPrice={maxPrice}
                applyPriceRange={applyPriceRange}
              />
              <ListProductComponent
                keyword={keyword}
                listProduct={listProduct}
                isLoading={isLoading}
                totalPage={totalPage}
                onPageNumberChange={onPageNumberChange}
                pageNumber={pageNumber}
              />
            </div>
          </div>
        </Container>
      </Container>
      <Footer></Footer>
    </>
  );
};

function getFilterGenreString(genres) {
  if (genres.length == 0) {
    return null;
  }
  var string_genre = "";
  genres.forEach((element) => {
    string_genre += element.name;
    string_genre += ",";
  });
  return string_genre.slice(0, string_genre.length - 1);
}

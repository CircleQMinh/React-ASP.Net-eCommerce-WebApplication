import React, { Fragment, useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import ProductService from "../../api/ProductService";
import "./SearchResult.css";

import { useQuery } from "../../utils";
import { PAGE_SIZE_SEARCH, RANGE_PRICE_SEARCH } from "../../utils/constant";

import { SearchField } from "./components/searchField";
import { FilterProduct } from "./components/filterProduct";
import { ListProductComponent } from "./components/listProduct";
import { TitleNav } from "../Home/components/TitleNav";

export const SearchPage = (props) => {
  const navigate = useNavigate();
  let query = useQuery();
  const [isLoading, setIsLoading] = useState(false);

  //Query param
  const pageQuery = parseInt(query.get("page") || 1);
  const nameQuery = query.get("name") || "";
  let genreQuery = [];
  let priceRangeQuery = RANGE_PRICE_SEARCH;
  const pageSizeQuery = parseInt(query.get("pageSize") || PAGE_SIZE_SEARCH);
  try {
    priceRangeQuery =
      query.get("priceRange").split(",").map(Number) || RANGE_PRICE_SEARCH;
  } catch {}
  try {
    genreQuery = JSON.parse(query.get("genre")) || [];
  } catch {}

  //State param
  const [pageNumber, setPageNumber] = useState(pageQuery || 1);
  const [pageSize, setPageSize] = useState(pageSizeQuery || PAGE_SIZE_SEARCH);
  const [keyword, setKeyword] = useState(nameQuery || ""); //
  const [filterGenreList, setFilterGenreList] = useState(genreQuery || []);
  const [priceRangeFilter, setPriceRangeFilter] = useState(
    priceRangeQuery || RANGE_PRICE_SEARCH
  );

  //Form
  let {
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      minPrice: "",
      maxPrice: "",
    },
  });
  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  const [listProduct, setListProduct] = useState([]);
  const [listGenre, setListGenre] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  //  function
  function onPriceRangeFilterChange(event) {
    const value = event.target.value.split(",").map(Number);
    setPriceRangeFilter(value);
    setPageNumber(1);
    redirectSearch(keyword, filterGenreList, 1, pageSize, value);
  }

  function onGenreFilterChange(event) {
    setPageNumber(1);
    let tempGenre = [];
    var genre = { name: event.target.value, id: event.target.id };
    if (genre.name != "all") {
      if (!filterGenreList.some((g) => g.name == genre.name)) {
        setFilterGenreList((state) => [...state, genre]);
        tempGenre = [...filterGenreList, genre];
      } else {
        setFilterGenreList(filterGenreList.filter((q) => q.id != genre.id));
        tempGenre = filterGenreList.filter((q) => q.id != genre.id);
      }
    } else {
      setFilterGenreList([]);
      filterGenreList.forEach((element) => {
        document.getElementById(element.id).checked = false;
      });
    }

    redirectSearch(keyword, tempGenre, 1, pageSize, priceRangeFilter);
  }

  function onSearchKeyWordChange(event) {
    setKeyword(event.target.value);
  }

  const handleSearch = () => {
    setPageNumber(1);
    redirectSearch(keyword, filterGenreList, 1, pageSize, priceRangeFilter);
  };

  function onPageNumberChange(page) {
    document.getElementById("searchBarProduct").scrollIntoView();
    setPageNumber(page);
    redirectSearch(keyword, filterGenreList, page, pageSize, priceRangeFilter);
  }

  function onMinPriceChange(event) {
    setValue("minPrice", event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function onMaxPriceChange(event) {
    setValue("maxPrice", event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function applyPriceRange(data) {
    const value = [parseInt(data.minPrice), parseInt(data.maxPrice)];
    setPriceRangeFilter(value);
    setPageNumber(1);
    redirectSearch(keyword, filterGenreList, 1, pageSize, value);
    reset(data);
  }

  function resetFilter() {
    setPageNumber(1);
    setPageSize(PAGE_SIZE_SEARCH);
    setKeyword("");
    setFilterGenreList([]);
    setPriceRangeFilter(RANGE_PRICE_SEARCH);
    redirectSearch("", [], 1, PAGE_SIZE_SEARCH, RANGE_PRICE_SEARCH);
  }

  const redirectSearch = (name, genre, page, pageSize, priceRange) => {
    let urlRedirect = "/search?";
    if (name) {
      urlRedirect += `name=${name}`;
    }
    if (genre) {
      urlRedirect += `&genre=${JSON.stringify(genre)}`;
    }
    if (page) {
      urlRedirect += `&page=${page}`;
    }
    if (pageSize) {
      urlRedirect += `&pageSize=${pageSize}`;
    }
    if (priceRange) {
      urlRedirect += `&priceRange=${priceRange.join(",")}`;
    }
    navigate(urlRedirect);
    getListProduct(page, pageSize, name, priceRange, genre);
  };

  const getListProduct = (
    pageQuery,
    pageSizeQuery,
    nameQuery,
    priceRangeQuery,
    genreQuery
  ) => {
    setIsLoading(true);
    ProductService.getProduct(
      pageQuery,
      pageSizeQuery,
      nameQuery,
      priceRangeQuery.join(","),
      getFilterGenreString(genreQuery)
    )
      .then((response) => {
        setListProduct(response.data.result);
        setTotalPage(
          Math.ceil(Number(response.data.totalProduct / pageSizeQuery))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getListProduct(
      pageQuery,
      pageSizeQuery,
      nameQuery,
      priceRangeQuery,
      genreQuery
    );
    ProductService.getGenre()
      .then((response) => {
        setListGenre(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <Header></Header>
      <div>
        {/* <TitleNav title="Cửa hàng sách Circle'shop"/> */}
        <Container fluid>
          <Container fluid className="p-2">
            <div className="row">
              <div className="col">
                <SearchField
                  onSearchKeyWordChange={onSearchKeyWordChange}
                  resetFilter={resetFilter}
                  handleSearch={handleSearch}
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
                  register={register}
                  isDirty={isDirty}
                  handleSubmit={handleSubmit}
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
      </div>
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

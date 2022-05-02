import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function formatCurrencyVN(number) {
  if (!number) {
    return "0";
  }

  return number
    .toString()
    .replace(/\./g, ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function stringAuthorsName(product) {
  return <p className="d-inline">{product.authors.map((au)=>{
    return <a className="me-2" href={"/author?name="+au.name}>{au.name}</a>
  })}</p>;
}

export function getRandomColor() {
  return `#${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
}

export function getReviewDate(strDate) {
  var date
  if(strDate.includes("Z")) {
    date = new Date(strDate);
  } else {
    date = new Date(strDate + "Z");
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getReviewTime(strDate) {
  var date
  if(strDate.includes("Z")) {
    date = new Date(strDate);
  } else {
    date = new Date(strDate + "Z");
  }
  return date.toLocaleTimeString();
}

export function getFormatStringFromList(list){
  var result = ""
  list.forEach(item => {
    result=result+=item.name
    result+=", "
  });
  result.slice(0,result.length-3)
  return result
}

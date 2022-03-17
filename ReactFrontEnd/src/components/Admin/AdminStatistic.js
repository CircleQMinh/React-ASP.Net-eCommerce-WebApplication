import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../helper/formatDate";
import { toast } from "react-toastify";
import AdminService from "../../api/AdminService";
import SaleChart from "./Chart/SaleChart";
import SaleStatistic from "./Statistic/SaleStatistic";
import OrderStatistic from "./Statistic/OrderStatistic";
import TopProductStatistic from "./Statistic/TopProductStatistic";
function AdminStatistic() {
  return (
    <Fragment>
      {" "}
      <SaleStatistic></SaleStatistic>
      <OrderStatistic></OrderStatistic>
      <TopProductStatistic></TopProductStatistic>
    </Fragment>
  );
}

export default AdminStatistic;

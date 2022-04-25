import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../../helper/formatDate";
import { toast } from "react-toastify";
import AdminService from "../../../api/AdminService";
import SaleChart from "./../Chart/SaleChart";

function SaleStatistic() {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([
    { date: new Date(2022, 2, 24).toISOString(), total: 13000 },
    { date: new Date(2022, 2, 25).toISOString(), total: 33000 },
    { date: new Date(2022, 2, 26).toISOString(), total: 23000 },
    { date: new Date(2022, 2, 27).toISOString(), total: 53000 },
  ]);
  var today = new Date();
  var priorDate = new Date(new Date().setDate(today.getDate() - 30));

  const [chartDateFrom, setChartDateFrom] = useState(
    formatDate(priorDate, "yyyy-MM-dd")
  );
  const [chartDateTo, setChartDateTo] = useState(
    formatDate(today, "yyyy-MM-dd")
  );

  function onChartDateFromChange(e) {
    setChartDateFrom(e.target.value);
  }
  function onChartDateToChange(e) {
    setChartDateTo(e.target.value);
  }
  function OnChartReload() {
    var from = chartDateFrom;
    var to = chartDateTo;
    var dateFrom = new Date(from);
    var dateTo = new Date(to);
    if (dateFrom >= dateTo) {
      toast.error("Ngày nhập không hợp lệ!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
        LoadNewChart(from,to)
    }
  }

  function LoadNewChart(from, to) {
    setisLoading(true);
    AdminService.GetSaleStatistic(from, to)
      .then((res) => {
        //console.log(res.data);
        var result = res.data.result;
        var list = [];
        for (const item in result) {
          // console.log(item)
          // console.log(result[item])
          var newTK = {
            date: item,
            total: result[item],
          };
          list.push(newTK);
        }
        //console.log(list);
        setData(list);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  useEffect(() => {
    LoadNewChart(chartDateFrom, chartDateTo);
  }, []);

  return (
    <div className="row my-2" id="saleChart" style={{backgroundColor: "#FFF", marginLeft: "0px", marginRight: "0px"}}>
      <div className="lead border border-3 p-3 lh-1 fw-bold">
        <i className="fa-solid fa-chart-line me-2"></i> Thống kê doanh thu
        <button
          className="btn btn-sm btn-primary float-end border border-2"
          onClick={OnChartReload}
        >
          <i className="fa-solid fa-arrows-rotate me-2"> </i>Tải dữ liệu
        </button>
        <hr></hr>
        <p className="text-monospace fw-bold">Từ :</p>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            defaultValue={chartDateFrom}
            onChange={onChartDateFromChange}
          ></input>
        </div>
        <p className="text-monospace fw-bold">Đến :</p>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            defaultValue={chartDateTo}
            onChange={onChartDateToChange}
          ></input>
        </div>
        <div className="container" style={{ height: 500 + "px" }}>
          {isLoading && (
            <div className="chart_spinner">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-center text-white mt-2">Đang tải dữ liệu</p>
            </div>
          )}
          {data.length != 0 && !isLoading  && (<SaleChart data={data}></SaleChart>)}
          {data.length == 0 && !isLoading  && (
            <p className="text-center text-white">Không có dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaleStatistic;

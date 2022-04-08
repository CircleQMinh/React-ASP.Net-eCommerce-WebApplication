import { React, Fragment, useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AuthService from "../../api/AuthService";
import { auth_action } from "../../redux/auth_slice.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLoading from "./../Admin/AdminLoading";
function ExportCSV() {
  const [authorizing, setAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(true);
  const dispatch = useDispatch();
  var navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);
  useEffect(() => {
    AuthService.GetAuthorizeAdmin()
      .then((res) => {
        //console.log(res.data);
        setAuthorizing(false);
      })
      .catch((e) => {
        toast.success("Xác thực không thành công! Xin hãy đăng nhập trước", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          dispatch(auth_action.logOut());
          navigate("/login");
        }, 2500);
      })
      .finally(() => {});
  }, [reRender]);

  var isDataExist = false;

  var data = JSON.parse(localStorage.getItem("exportCSVData"));
  var header = JSON.parse(localStorage.getItem("exportCSVHeader"));

  if (data && header) {
    // console.log(data);
    // console.log(header);
    isDataExist = true;
  } else {
    window.close();
  }
  useEffect(
    () => () => {
      localStorage.removeItem("exportCSVData");
      localStorage.removeItem("exportCSVHeader");
    },
    []
  );
  return (
    <Fragment>
      {authorizing && <AdminLoading></AdminLoading>}
      {!authorizing && isDataExist && (
        <CSVLink data={data} headers={header} filename={"download.csv"}>
          Download as CSV
        </CSVLink>
      )}
    </Fragment>
  );
}

export default ExportCSV;

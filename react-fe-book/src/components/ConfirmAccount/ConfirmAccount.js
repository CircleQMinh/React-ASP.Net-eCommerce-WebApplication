import { React, Fragment, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthService from "../../api/AuthService";
function ConfimrAccount() {
  //var
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const navigate = useNavigate();
  //function

  //
  useEffect(() => {
    //   console.log(params)
    //   console.log(params.email)
    //   console.log(params.token)
    if (params.email !== undefined && params.token !== undefined) {
      AuthService.ConfimrEmail(params.email, params.token)
        .then((response) => {
          if (response.data.success) {
            toast.success("Xác thực thành công!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            toast.error("Xác thực không thành công!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .catch((error) => {
          toast.error("Xác thực không thành công!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .finally(() => {
          navigate("/login");
        });
    } else {
      navigate("/error"); //move to error later
    }
  });
  return (
    <Fragment>
      <Header></Header>
      <Container fluid className="form-all-con h-100 ">
        <div className="d-flex justify-content-center h-100 animate__animated animate__rotateIn">
          <div className={"user_card"}>
            <div className="d-flex justify-content-center mb-3">
              <div className={"brand_logo_container"}>
                <img
                  src="https://res.cloudinary.com/dkmk9tdwx/image/upload/v1628192627/logo_v5ukvv.png"
                  className={"brand_logo"}
                  alt="Logo"
                />
              </div>
            </div>

            <div
              className={
                "form_container d-flex justify-content-center flex-column align-items-center"
              }
              style={{ marginTop: 80 + "px" }}
            >
              <p
                style={{
                  display: "block",
                  fontSize: 18 + "px",
                  wordBreak: "break-word",
                }}
                className="text-center d-flex flex-column align-items-center"
              >
                Tài khoản của bạn đang được xác thực
              </p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Xin chờ một tí...{" "}
              <p
                style={{
                  display: "block",
                  fontSize: 18 + "px",
                  wordBreak: "break-word",
                  marginTop: 10 + "px",
                }}
              >
                <span className="text-center">
                  Bạn sẽ được điều hướng sau khi xác thực xong.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </Fragment>
  );
}

export default ConfimrAccount;

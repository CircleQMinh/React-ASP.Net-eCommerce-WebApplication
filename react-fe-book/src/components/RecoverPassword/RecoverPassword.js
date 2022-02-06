import React, { Fragment, useState } from "react";
import "../Login/Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";
import AuthService from "../../api/AuthService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function RecoverPassword(props) {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  var [isSubmitting, setIsSubmitting] = useState(false);
  var [isDone, setIsDone] = useState(false);
  //function

  function tryRecoverPassword(data) {
    setIsSubmitting(true);
    AuthService.RequestNewPassword(data.email)
      .then((response) => {
        if (response.data.success) {
          toast.success("Gửi yêu cầu thành công!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setIsDone(true);
        } else {
          toast.error(response.data.msg, {
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
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Fragment>
      <Header></Header>
      <Container fluid className="form-all-con h-100">
        {isDone && (
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
                  Email xác thực đã được gửi về email đăng ký của bạn!
                </p>
                <div className="d-flex">
                  <i
                    className="fas fa-envelope-open-text"
                    style={{ fontSize: 45 + "px" }}
                  ></i>
                  <i
                    className="fas fa-long-arrow-alt-right mx-5"
                    style={{ fontSize: 35 + "px" }}
                  ></i>
                  <i
                    className="fas fa-check"
                    style={{ fontSize: 45 + "px" }}
                  ></i>
                </div>

                <p
                  style={{
                    display: "block",
                    fontSize: 18 + "px",
                    wordBreak: "break-word",
                    marginTop: 10 + "px",
                  }}
                >
                  <span className="text-center">
                    Bạn hãy kiểm tra email để khôi phục mật khẩu.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {!isDone && (
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
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "25px",
                    marginTop: "50px",
                  }}
                  className="text-monospace"
                >
                  Khôi phục mật khẩu
                </strong>
              </div>
              <div
                className={
                  "form_container d-flex justify-content-center flex-column align-items-center"
                }
              >
                <form onSubmit={handleSubmit(tryRecoverPassword)}>
                  <InputGroup className=" mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fas fa-envelope-open-text"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                  </InputGroup>
                  {errors.email?.type === "required" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>Email không
                      để trống
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>Email không
                      hợp lệ!
                    </p>
                  )}
                  <div
                    className={
                      "d-flex justify-content-center mt-3 login_container"
                    }
                  >
                    <button
                      type="submit"
                      name="button"
                      className={"btn login_btn"}
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {!isSubmitting && (
                        <Fragment>
                          <i className="fas fa-sign-in-alt me-2"></i> Gửi yêu
                          cầu{" "}
                        </Fragment>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Đã có tài khoản?{" "}
                  <Link to="/login" className="ms-2">
                    Đăng Nhập
                  </Link>
                </div>
                <div className="d-flex justify-content-center links">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="ms-2">
                    Đăng Ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer></Footer>
    </Fragment>
  );
}

export default RecoverPassword;

import React, { Fragment, useState } from "react";
import "../Login/Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";
import AuthService from "../../api/AuthService";
import {toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
function Register(props) {
  //form reg
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //var
  const navigate = useNavigate();
  var [isSubmitting, setIsSubmitting] = useState(false);
  var [errorsValid, setErrors] = useState(["err1", "err2"]);
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);
  var [isDone, setIsDone] = useState(false);
  //function
  async function TryRegister(data) {
    setIsSubmitting(true);
    AuthService.Register(data)
      .then((response) => {
        if (response.data.success) {
          toast.success("Đăng ký thành công! Hãy kiểm tra email và xác thực tài khoản", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setIsDone(true);
        } else {
          toast.error("Đăng ký không thành công", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setIsSubmitting(false);
          setErrors(response.data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setIsSubmitting(false)
      });
  }
  //run first

  return (
    <Fragment>
      <Header></Header>
      <Container fluid className="form-all-con h-100">
        {!isLoggedIn && !isDone && (
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
                  Đăng ký
                </strong>
              </div>
              {errorsValid.length > 0 && (
                <div className="d-flex align-items-center flex-column mt-2 ">
                  {errorsValid.includes("DuplicateUserName") && (
                    <p className="text-monospace">
                      {" "}
                      <i className="fas fa-exclamation-triangle"></i>Tên tài
                      khoản đã được sử dụng
                    </p>
                  )}
                  {errorsValid.includes("DuplicateEmail") && (
                    <p className="text-monospace">
                      {" "}
                      <i className="fas fa-exclamation-triangle"></i>Email đã
                      được sử dụng
                    </p>
                  )}
                </div>
              )}
              <div
                className={
                  "form_container d-flex justify-content-center flex-column align-items-center"
                }
              >
                <form onSubmit={handleSubmit(TryRegister)}>
                  <InputGroup className=" mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <i className="far fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      {...register("userName", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.username?.type === "required" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>Tên tài
                      khoản không để trống
                    </p>
                  )}
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
                  <InputGroup className=" mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fas fa-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Số điện thoại"
                      {...register("phoneNumber", {
                        required: true,
                        minLength: 9,
                        maxLength: 10,
                      })}
                    />
                  </InputGroup>
                  {errors.phoneNumber?.type === "required" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>SDT không
                      để trống
                    </p>
                  )}
                  {errors.phoneNumber?.type === "minLength" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>SDT không
                      hợp lệ
                    </p>
                  )}
                  {errors.phoneNumber?.type === "maxLength" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>SDT không
                      hợp lệ
                    </p>
                  )}
                  <InputGroup className=" mb-2">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fas fa-key"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.password?.type === "required" && (
                    <p className="text-center">
                      <i className="fas fa-exclamation-triangle"></i>Password
                      không để trống
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
                          <i className="fas fa-sign-in-alt me-2"></i> Đăng ký{" "}
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
                  Quên mật khẩu?
                  <Link to="/recover-password" className="ms-2">
                    Tìm lại mật khẩu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoggedIn && isDone && (
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
                <i className="fas fa-envelope-open-text" style={{fontSize:45+'px'}}></i>
                <i className="fas fa-long-arrow-alt-right mx-5" style={{fontSize:35+'px'}}></i>
                <i className="fas fa-check" style={{fontSize:45+'px'}}></i>
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
                    Bạn hãy kiểm tra email để hoàn thành quá trình đăng ký.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {isLoggedIn && (
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
                  className="text-center"
                >
                  Bạn đã đăng nhập với tài khoản
                  <a href="/" className="mx-2">
                    '{user.userName}'
                  </a>
                  sử dụng email :
                </p>
                <p
                  style={{
                    display: "block",
                    fontSize: 18 + "px",
                    wordBreak: "break-word",
                  }}
                >
                  <span className="text-center">{user.email}</span>
                </p>
                <p
                  style={{
                    display: "block",
                    fontSize: 18 + "px",
                    wordBreak: "break-word",
                  }}
                >
                  <span className="text-center">
                    Để đăng ký tài khoản mới hãy đăng xuất trước!
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer></Footer>
    </Fragment>
  );
}

export default Register;

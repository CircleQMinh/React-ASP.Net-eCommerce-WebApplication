import React, { Fragment, useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import "./Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import AuthService from "../../api/AuthService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { auth_action} from '../../redux/auth_slice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Login(props) {
  //form login
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //var
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  var [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.auth_slice.user);
  const navigate = useNavigate();

  //function
  async function TryLogin(data) {
    setIsSubmitting(true);
    AuthService.Login(data.email, data.password)
      .then((response) => {
        //console.log(response);
        if (response.data.success) {
          toast.success("Đăng nhập thành công!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          dispatch(auth_action.saveAuthInfoToLocalStorage(response.data));
          var redirect = localStorage.getItem("redirect")
          if(redirect){
            localStorage.removeItem("redirect")
            navigate(redirect)
          }
          window.location.reload()
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
  //run first
  useEffect(()=>{
    dispatch(auth_action.getAuthInfoFromLocalStorage())
  },[isLoggedIn,dispatch])



  return (
    <Fragment>
      <Header></Header>
      <Container fluid className="form-all-con h-100 ">
        {!isLoggedIn && (
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
                <p
                  style={{
                    display: "block",
                    fontSize: "25px",
                    marginTop: "50px",
                  }}
                  className="text-monospace"
                >
                  Đăng nhập
                </p>
              </div>
              <div
                className={
                  "form_container d-flex justify-content-center flex-column align-items-center"
                }
              >
                <form onSubmit={handleSubmit(TryLogin)}>
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
                          <i className="fas fa-sign-in-alt me-2"></i> Login{" "}
                        </Fragment>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="ms-2">
                    Đăng Ký
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
                style={{marginTop:80+'px'}}
              >
                <p style={{display:"block",fontSize:18+'px',wordBreak:"break-word"}} className="text-center">
                  Bạn đã đăng nhập với tài khoản 
                  <a href="/" className="mx-2">
                    '{user.userName}'
                  </a>
                  sử dụng email :
                </p>
                <p style={{display:"block",fontSize:18+'px',wordBreak:"break-word"}}>
                    <span className="text-center">{user.email}</span>
                </p>
                <p style={{display:"block",fontSize:18+'px',wordBreak:"break-word"}} >
                    <span className="text-center">Bạn sẽ được điều hướng trong {3}s</span>
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

export default Login;

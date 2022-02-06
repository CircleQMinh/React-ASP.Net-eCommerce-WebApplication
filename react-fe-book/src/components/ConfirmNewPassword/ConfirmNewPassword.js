import React, { Fragment, useState } from "react";
import "../Login/Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";
import AuthService from "../../api/AuthService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ConfimrNewPassword(props) {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  var [isSubmitting, setIsSubmitting] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const navigate = useNavigate();

  //function
  function tryConfirmNewPassword(data) {
    setIsSubmitting(true);
    AuthService.ConfimrNewPassword(params.email,params.token,data.password)
      .then((response) => {
        if (response.data.success) {
          toast.success("Đổi mật khẩu thành công!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/home")
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

  if (params.email !== undefined && params.token !== undefined){

  }
  else {
    navigate("/error"); //move to error later
  }
  return (
    <Fragment>
      <Header></Header>
      <Container fluid className="form-all-con h-100">
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
                Nhập mật khẩu mới
              </strong>
            </div>
            <div
              className={
                "form_container d-flex justify-content-center flex-column align-items-center"
              }
            >
              <form onSubmit={handleSubmit(tryConfirmNewPassword)}>
                <InputGroup className=" mb-3">
                  <InputGroup.Text id="basic-addon1">
                  <i className="fas fa-key"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Mật khẩu mới"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </InputGroup>
                {errors.password?.type === "required" && (
                  <p className="text-center">
                    <i className="fas fa-exclamation-triangle"></i>Mật khẩu
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
                        <i className="fas fa-sign-in-alt me-2"></i> Gửi yêu cầu{" "}
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
      </Container>
      <Footer></Footer>
    </Fragment>
  );
}

export default ConfimrNewPassword;

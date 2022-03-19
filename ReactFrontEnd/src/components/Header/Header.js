import React, { Fragment, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  NavItem,
  Button,
  NavDropdown,
  Form,
  Nav,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../Cart/CartIcon";

function Header(props) {
  //dropdown
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const [show_profile, setShow_profile] = useState(false);
  const showDropdown_profile = (e) => {
    setShow_profile(!show);
  };
  const hideDropdown_profile = (e) => {
    setShow_profile(false);
  };

  //var
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

  //function
  function LogOut() {
    // navigate("/home")
    dispatch(auth_action.logOut());
  }

  //run first
  useEffect(() => {
    dispatch(auth_action.getAuthInfoFromLocalStorage());
  }, [isLoggedIn, dispatch]);

  // for (const [key, value] of Object.entries(user)) {
  //   console.log(`${key}: ${value}`);
  // }

  function onLoginClick() {
    const pathname = window.location.pathname; //returns the current url minus the domain name
    localStorage.setItem("redirect", pathname);
    navigate("/login");
  }

  const redirectFavorite = () => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      navigate(`/favorite/1`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <Fragment>
      <CartIcon></CartIcon>
      <Navbar
        expand="lg"
        variant="light"
        sticky="top"
        className="p-0 ms-auto"
        style={{ backgroundColor: "rgb(139 203 255)" }}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to={"/"}>
            <img
              src="https://res.cloudinary.com/dkmk9tdwx/image/upload/v1628192627/logo_v5ukvv.png"
              style={{ height: "40px", width: "40px" }}
              alt="Nav Icon"
            />
            <p className={"show_for_991"} style={{ display: "inline" }}>
              Circle's Shop
            </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <div className="d-flex justify-content-center">
              <Form className={`d-flex top-nav-searchbar `}>
                <input
                  className={"form-control me-2"}
                  type="search"
                  placeholder="Tìm sản phẩm mà bạn quan tâm ..."
                  aria-label="Search"
                  name="search"
                />
                <Button variant="primary" type="submit">
                  <i className="fas fa-search"></i>
                </Button>
              </Form>
            </div>
            <Nav as="ul" className="align-items-center">
              <NavItem as="li">
                <Nav.Link as={NavLink} to={"/search"}>
                  <i className="fas fa-receipt me-2"></i>
                  <p className="hide_for_1399 show_for_991">Sản phẩm</p>
                </Nav.Link>
              </NavItem>
              <NavDropdown
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                as="li"
                title={
                  <Fragment>
                    <i className="fas fa-bars me-2"></i>
                    <p className="hide_for_1399 show_for_991">Danh mục</p>
                  </Fragment>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={redirectFavorite}>
                  Yêu thích
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
              <NavItem as="li">
                <Nav.Link as={NavLink} to={"/news"}>
                  <i className="far fa-newspaper me-2"></i>
                  <p className="hide_for_1399 show_for_991">Tin tức</p>
                </Nav.Link>
              </NavItem>

              <NavItem as="li">
                <Nav.Link as={NavLink} to={"/contact"}>
                  <i className="far fa-question-circle me-2"></i>
                  <p className="hide_for_1399 show_for_991">Liên hệ</p>
                </Nav.Link>
              </NavItem>
              {!isLoggedIn && (
                <NavItem as="li" onClick={onLoginClick}>
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt  me-2"></i>
                    <p className="hide_for_1399 show_for_991">Đăng nhập</p>
                  </Nav.Link>
                </NavItem>
              )}

              {isLoggedIn && (
                <Fragment>
                  <NavDropdown
                    show={show_profile}
                    onMouseEnter={showDropdown_profile}
                    onMouseLeave={hideDropdown_profile}
                    as="li"
                    className="drop_down_li"
                    title={
                      <div className="d-flex flex-row ">
                        <img
                          src={user.imgUrl}
                          alt="avatar"
                          className="avatar_icon "
                        ></img>
                        <div className="d-flex align-items-center pt-2 ps-1">
                          <p className="hide_for_1399 show_for_991 p-0 ">
                            {user.userName}{" "}
                          </p>
                        </div>
                      </div>
                    }
                    id="profile_drop"
                  >
                    <NavDropdown.Item as={NavLink} to={`/profile/${user.id}`}>
                      <i className="fas fa-user me-2"></i>
                      <p className="d-inline show_for_991">Tài khoản</p>
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={`/favorite/1`}>
                      <i className="fa-solid fa-heart me-2"></i>
                      <p className="d-inline show_for_991">Yêu thích</p>
                    </NavDropdown.Item>
                    {user.roles.includes("Administrator") && (
                      <NavDropdown.Item as={NavLink} to={`/admin/dashboard`}>
                        <i className="fas fa-home me-2"></i>
                        <p className="d-inline show_for_991">Trang quản lý</p>
                      </NavDropdown.Item>
                    )}
                    {user.roles.includes("Shipper") && (
                      <NavDropdown.Item as={NavLink} to={`/shipper/dashboard`}>
                        <i className="fas fa-home me-2"></i>
                        <p className="d-inline show_for_991">Trang giao hàng</p>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={LogOut}>
                      <i className="fas fa-sign-in-alt  me-2"></i>
                      <p className="d-inline  show_for_991">Đăng xuất</p>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Header;

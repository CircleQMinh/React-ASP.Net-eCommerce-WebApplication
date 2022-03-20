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
import { NavLink } from "react-router-dom";
import { auth_action } from "../../redux/auth_slice.js";
import AuthService from "../../api/AuthService";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../Cart/CartIcon";

function ShipperHeader(props) {
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
  const isLoggedIn = useSelector((state) => state.auth_slice.isLoggedIn);
  const user = useSelector((state) => state.auth_slice.user);

  //function
  function LogOut() {
    dispatch(auth_action.logOut());
  }

  //run first
  useEffect(() => {
    dispatch(auth_action.getAuthInfoFromLocalStorage());
  }, [isLoggedIn, dispatch]);

  // for (const [key, value] of Object.entries(user)) {
  //   console.log(`${key}: ${value}`);
  // }

  return (
    <Fragment>
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        className="p-0 me-auto"
        style={{ backgroundColor: "#2732A4" }}
      >
        <Navbar.Brand as={NavLink} to={"/shipper/dashboard"} className="ms-3">
          <p className={"show_for_991"} style={{ display: "inline" }}>
            <i className="fas fa-home me-2" ></i> Shipper
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="">
          <ul className="navbar-nav mx-auto ">
            <NavItem as="li" className="ms-5">
              <Nav.Link as={NavLink} to={"/shipper/find"}>
              <i className="fa-solid fa-magnifying-glass "></i>
                <p className="d-inline show_for_991"> Tìm đơn hàng</p>
              </Nav.Link>
            </NavItem>
            <NavItem as="li">
              <Nav.Link as={NavLink} to={"/shipper/current"}>
                <i className="fas fa-shopping-bag"></i>
                <p className="d-inline show_for_991"> Đơn hàng đã nhận</p>
              </Nav.Link>
            </NavItem>

            <NavItem as="li">
              <Nav.Link as={NavLink} to={"/shipper/history"}>
                <i className="far fa-id-card"></i>
                <p className="d-inline show_for_991"> Lịch sử giao hàng</p>
              </Nav.Link>
            </NavItem>

          </ul>
          <Nav as="ul" className="ms-auto">
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
                  style={{ marginRight: 30 + "px" }}
                >
                  <NavDropdown.Item as={NavLink}  to={`/profile/${user.id}`}>
                    <i className="fas fa-user me-2"></i>
                    <p className="d-inline show_for_991">Tài khoản</p>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink}  to={`/home`}>
                  <i className="fas fa-home me-2" ></i>
                    <p className="d-inline show_for_991">Cửa hàng</p>
                  </NavDropdown.Item>
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
      </Navbar>
    </Fragment>
  );
}

export default ShipperHeader;

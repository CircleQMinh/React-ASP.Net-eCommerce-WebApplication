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
import ProductService from "../../api/ProductService";

function Header(props) {
  document.getElementById("fb-root").style.display = '';
  const [listGenre, setListGenre] = useState([]);
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

  const loadGenre = () => {
    ProductService.getGenre()
      .then((response) => {
        setListGenre(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  //run first
  useEffect(() => {
    dispatch(auth_action.getAuthInfoFromLocalStorage());
    loadGenre();
  }, [isLoggedIn, dispatch]);

  // for (const [key, value] of Object.entries(user)) {
  //   console.log(`${key}: ${value}`);
  // }

  function onLoginClick() {
    const pathname = window.location.pathname; //returns the current url minus the domain name
    localStorage.setItem("redirect", pathname);
    navigate("/login");
  }

  const redirectSearch = (value) => {
    window.scrollTo(0, 0);
    const genre = JSON.stringify([value]);
    navigate(`/search?genre=${genre}`);
    window.location.reload(false);
  };

  function redirectSearchKeyWord(e) {
    var value = document.getElementById("header_searchbar").value;
    //console.log(value)
    window.scrollTo(0, 0);
    navigate(`/search?name=${value}`);
    window.location.reload(false);
  }

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
              <Form
                className={`d-flex top-nav-searchbar `}
                onSubmit={redirectSearchKeyWord}
              >
                <input
                  className={"form-control me-2"}
                  type="search"
                  placeholder="T??m s???n ph???m m?? b???n quan t??m ..."
                  aria-label="Search"
                  name="search"
                  id="header_searchbar"
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
                  <p className="hide_for_1399 show_for_991">S???n ph???m</p>
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
                    <p className="hide_for_1399 show_for_991">Danh m???c</p>
                  </Fragment>
                }
                id="basic-nav-dropdown"
              >
                {listGenre.length > 0 &&
                  listGenre.map((item, index) => (
                    <NavDropdown.Item
                      key={`NavGenre-${index}`}
                      onClick={() => redirectSearch(item)}
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <NavItem as="li">
                <Nav.Link as={NavLink} to={"/news"}>
                  <i className="far fa-newspaper me-2"></i>
                  <p className="hide_for_1399 show_for_991">Tin t???c</p>
                </Nav.Link>
              </NavItem>

              <NavItem as="li">
                <Nav.Link as={NavLink} to={"/contact"}>
                  <i className="far fa-question-circle me-2"></i>
                  <p className="hide_for_1399 show_for_991">Li??n h???</p>
                </Nav.Link>
              </NavItem>
              {!isLoggedIn && (
                <NavItem as="li" onClick={onLoginClick}>
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt  me-2"></i>
                    <p className="hide_for_1399 show_for_991">????ng nh???p</p>
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
                      <p className="d-inline show_for_991">T??i kho???n</p>
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={`/favorite/1`}>
                      <i className="fa-solid fa-heart me-2"></i>
                      <p className="d-inline show_for_991">Y??u th??ch</p>
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={`/redeem`}>
                      <i className="fa-solid fa-tags me-2"></i>
                      <p className="d-inline show_for_991">M?? gi???m gi??</p>
                    </NavDropdown.Item>
                    {user.roles.includes("Administrator") && (
                      <NavDropdown.Item as={NavLink} to={`/admin/dashboard`}>
                        <i className="fas fa-home me-2"></i>
                        <p className="d-inline show_for_991">Trang qu???n l??</p>
                      </NavDropdown.Item>
                    )}
                    {user.roles.includes("Shipper") && (
                      <NavDropdown.Item as={NavLink} to={`/shipper/dashboard`}>
                        <i className="fas fa-home me-2"></i>
                        <p className="d-inline show_for_991">Trang giao h??ng</p>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={LogOut}>
                      <i className="fas fa-sign-in-alt  me-2"></i>
                      <p className="d-inline  show_for_991">????ng xu???t</p>
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

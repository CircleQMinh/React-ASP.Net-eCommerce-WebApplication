import logo from "./logo.svg";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import Home from "./pages/Home/Home";
import React,{Fragment} from "react";
import { BrowserRouter, Routes, Route,  Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import ProductInfo from "./pages/Product";
import { ToastContainer, toast } from 'react-toastify';
import ConfimrAccount from "./components/ConfirmAccount/ConfirmAccount";
import ErrorPage from "./components/Error/ErrorPage";
import ConfimrNewPassword from "./components/ConfirmNewPassword/ConfirmNewPassword";
import Test from "./components/Test/Test";
import Checkout from "./components/Checkout/Checkout";
import Thankyou from "./components/Thankyou/Thankyou";
import Dashboard from "./components/Admin/Dashboard";
import AdminOrder from "./components/Admin/AdminOrder";
import AdminProduct from "./components/Admin/AdminProduct";
import Profile from "./components/Profile/Profile";
import ProfileOrder from "./components/Profile/ProfileOrder";
import AdminPromotion from "./components/Admin/AdminPromotion";
import ShipperDashboard from "./components/Shipper/ShipperDashboard";
import ShipperFind from "./components/Shipper/ShipperFind";
import ShipperCurrent from "./components/Shipper/ShipperCurrent";
import ShipperHistory from "./components/Shipper/ShipperHistory";
import AdminUser from "./components/Admin/AdminUser";
import ContactPage from "./pages/Contact";
import { NewsPage } from "./pages/News";
import { SearchPage } from "./pages/Search";
import AdminEmp from "./components/Admin/AdminEmp";
import AdminDiscount from "./components/Admin/AdminDiscount";

import AdminGenre from "./components/Admin/AdminGenre";

import FavoritePage from "./pages/Favorite";
import ExportCSV from "./components/ExportCSV/ExportCSV";
import Redeem from "./components/Redeem/Redeem";
import PromoInfo from "./components/PromoInfo/PromoInfo";
import AuthorBook from "./components/Author/Author";


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"}> </Navigate>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>

          <Route path="/login" element={<Login></Login>} ></Route>
          <Route path="/register" element={<Register></Register>} ></Route>
          <Route path="/confirmAccount" element={<ConfimrAccount></ConfimrAccount>} ></Route>
          <Route path="/recover-password" element={<RecoverPassword></RecoverPassword>} ></Route>
          <Route path="/confirmPassword" element={<ConfimrNewPassword></ConfimrNewPassword>} ></Route>

          <Route path="/error" element={<ErrorPage></ErrorPage>} ></Route>
          <Route path="/test" element={<Test></Test>} ></Route>

          <Route path="/book/:id" element={<ProductInfo />}></Route>
          <Route path="/author" element={<AuthorBook></AuthorBook>} ></Route>
          <Route path="/checkout" element={<Checkout></Checkout>} ></Route>
          <Route path="/thankyou" element={<Thankyou></Thankyou>} ></Route>

          <Route path="/admin/dashboard" element={<Dashboard></Dashboard>} ></Route>
          <Route path="/admin/order" element={<AdminOrder></AdminOrder>} ></Route>
          <Route path="/admin/product" element={<AdminProduct></AdminProduct>} ></Route>
          <Route path="/admin/promotion" element={<AdminPromotion></AdminPromotion>} ></Route>
          <Route path="/admin/user" element={<AdminUser></AdminUser>} ></Route>
          <Route path="/admin/employee" element={<AdminEmp></AdminEmp>} ></Route>
          <Route path="/admin/discount" element={<AdminDiscount></AdminDiscount>} ></Route>
          <Route path="/admin/genre" element={<AdminGenre></AdminGenre>} ></Route>

          <Route path="/profile/:id" element={<Profile></Profile>} ></Route>
          <Route path="/profile/:id/order" element={<ProfileOrder></ProfileOrder>} ></Route>

          <Route path="/shipper/dashboard" element={<ShipperDashboard></ShipperDashboard>} ></Route>
          <Route path="/shipper/find" element={<ShipperFind></ShipperFind>} ></Route>
          <Route path="/shipper/current" element={<ShipperCurrent></ShipperCurrent>} ></Route>
          <Route path="/shipper/history" element={<ShipperHistory></ShipperHistory>} ></Route>

          <Route path="/contact" element={<ContactPage/>}></Route>
          <Route path="/news" element={<NewsPage/>}></Route>
          <Route path="/favorite/:page" element={<FavoritePage/>}></Route>
          <Route path="/search" element={<SearchPage/>}></Route>
          <Route path="/redeem" element={<Redeem/>}></Route>
          <Route path="/promotion/:id" element={<PromoInfo></PromoInfo>} ></Route>

          <Route path="/exportCSV" element={<ExportCSV/>}> </Route>
        </Routes>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
   
    </Fragment>
  );
}

export default App;

import { React, Fragment } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function ErrorPage() {
  return (
    <Fragment>
      <Header></Header>
      <div id="notfound" style={{backgroundColor:"#A52A2A"}}>
        <div className="notfound">
          <div className="notfound-404">
            <div></div>
            <h1>404</h1>
          </div>
          <h2>Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <a href="/home">home page</a>
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default ErrorPage;

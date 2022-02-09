import { React, Fragment } from "react";
import AuthService from "../../api/AuthService";

function Test() {
  function DoSMT() {
    AuthService.GetAuthorize("69")
      .then((res) => {console.log(res.data)})
      .catch((error) => {})
      .finally(() => {});
  }

  return (
    <Fragment>
      <button onClick={DoSMT}>TEst</button>
    </Fragment>
  );
}

export default Test;

import { React, Fragment } from "react";
import AuthService from "../../api/AuthService";

function Test() {

    function DoSMT(){
        AuthService.TestProvider("Google","/home").then(
            (response )=>{
                console.log(response )
            }
        )
        .catch((error)=>{

        })
        .finally(()=>{

        })
    }

  return (
    <Fragment>
      <button onClick={DoSMT}>TEst</button>
    </Fragment>
  );
}

export default Test;

import { useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TAB_IDS } from "../../constants/general";
import { getIsLoggedInFlag, setAuthHeaders } from "../../helpers/auth";

export const Login = () => {  
    const idRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();
    const isLoggedIn = getIsLoggedInFlag();

    // Todo - If already logged in - then redirect to /members
    // dont show login page.
    if (isLoggedIn) {
      return <Navigate to={`/${TAB_IDS.MEMBERS}`}/>
    }

    const doLogin = () => {
      var raw = JSON.stringify({
        "phoneNumber": idRef.current.value,
        "password": passRef.current.value
      });
  
      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: raw
      };
  
      fetch(`https://t1m-addressbook-service.onrender.com/login/v1`, requestOptions)
        .then(response => response.json())
        .then(r => {
          console.log('login response ', r);
          setAuthHeaders(r.phoneNumber, r.loginToken);
          navigate(`/${TAB_IDS.MEMBERS}`);
          window.location.href = '/'; // This is hack.. need to do bcz there is no centralised state.. Fix this
        })
        .catch(error => {
            // handle error by your self
            console.log('error', error);
        });
    };
  
    return (
      <div className="App">
          <div>
            <input ref={idRef} type='text' placeholder='enter phone number here' />
            &nbsp;&nbsp;&nbsp;
            <input ref={passRef} type='password' placeholder='enter password here' />
          </div>
          <br />
          <button type='button' onClick={doLogin}>Login</button>
      </div>
    );
  }
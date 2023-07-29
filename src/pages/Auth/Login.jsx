import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { TAB_IDS } from "../../constants/general";
import { useAppStore } from '../../store';

export const Login = () => {
    const { data, actions } = useAppStore(state => state);
    const { admin } = data;
    const { login }= actions;

    const idRef = useRef(null);
    const passRef = useRef(null);
    const isLoggedIn = admin && admin.data

    const handleSubmit = React.useCallback(() => {
      login(idRef.current.value, passRef.current.value);
    }, [login]);

    const { isFetching, errMsg } = (admin || {});
      // dont show login page.
      if (isLoggedIn) {
        return <Navigate to={`/${TAB_IDS.MEMBERS}`}/>
      }
  
    return (
      <div className="App">
          <div>
            {isFetching? <h3>Fetching... Please wait...</h3> : ''}
            {errMsg ? <div className="errMsg">{errMsg}</div> : ''}
            <input disabled={!!isFetching} ref={idRef} type='text' placeholder='enter phone number here' />
            &nbsp;&nbsp;&nbsp;
            <input disabled={!!isFetching} ref={passRef} type='password' placeholder='enter password here' />
          </div>
          <br />
          <button type='button' disabled={!!isFetching} onClick={handleSubmit}>Login</button>
      </div>
    );
  }
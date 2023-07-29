import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { TAB_IDS } from "../../constants/general";
import { useAppStore } from '../../store';
import _ from 'lodash';

export const Login = () => {
    const { data, actions } = useAppStore(state => state);
    const { admin } = data;
    const { login }= actions;

    const idRef = useRef(null);
    const passRef = useRef(null);
    const isLoggedIn = admin && admin.data

    // dont show login page.
    if (isLoggedIn) {
      return <Navigate to={`/${TAB_IDS.MEMBERS}`}/>
    }

    const handleSubmit = React.useCallback(() => {
      login(idRef.current.value, passRef.current.value);
    }, [login]);

    const isFetching = _.get(admin, 'isFetching', false);
    const errMsg = _.get(admin, 'errMsg', '');

    return (
      <div className="App">
          <div>
            <input ref={idRef} type='text' placeholder='enter phone number here' />
            &nbsp;&nbsp;&nbsp;
            <input ref={passRef} type='password' placeholder='enter password here' />
          </div>
          <br />
          <button type='button' onClick={handleSubmit}>Login</button>
      </div>
    );
  }
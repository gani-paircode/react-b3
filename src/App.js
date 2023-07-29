import React from 'react';
import "./styles.css";
import Community from './pages/Community';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { TABS, TAB_IDS } from './constants/general';
import { Landing } from './pages/Community/TabComponents';
import { useAppStore } from './store';

export default function App() {
  return (
    <div className="App">
      <div id="CommunityContainer">
        <Header />
        <div className="tabComponent">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/*" element={<Community />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <section>Hey we are engineers !! Wanna join our gang :) </section>
    </div>
  )
}

const SignUp = () => {
  const admin = useAppStore(state => state.data.admin);
  const isLoggedIn = admin && admin.data;
  console.log('In SignUp component - admin - ', admin);
  
  if (isLoggedIn) {
    return <Navigate to={`/${TAB_IDS.MEMBERS}`}/>
  }
  return (
    <div>
      <h1>Signup</h1>
      <section>Comming Soon !! </section>
    </div>
  )
}


const Header = () => {
  const admin = useAppStore(state => state.data.admin);
  const isLoggedIn = admin && admin.data;
  return (<div className="tabItems">
    {isLoggedIn ?  <AuthorisedTabs />: ''}
    {!isLoggedIn ? <UnAuthorisedTabs /> : ''}
    <CommonTabs />
  </div>);
}

const UnAuthorisedTabs = () => {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Sign Up</Link>
    </>
  )
}
const AuthorisedTabs = () => {
  const navigate = useNavigate();
  const { logMeOut } = useAppStore(state => state.actions);
  const { logout } = useAppStore(state => state.data);
  const { isFetching } = logout || {};
  return (
    <>
      {TABS.map(({ id, text }) => <Link key={id} to={`/${id}`}>{text}</Link>)}
      <a key="logout" disabled={isFetching} onClick={logMeOut}>Logout</a>
    </>
  )
}

const CommonTabs = () => {
  return (
    <Link to="/about-us">About Us</Link>
  )
}
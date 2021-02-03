import React from 'react';
import {Container, Row} from 'react-bootstrap';
//import axios from 'axios'
const notLoginToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function Header(props) {
  let isLoggedIn = false
  if (localStorage.getItem('userInfo') !== null){
   isLoggedIn = true
  }
  const handleLogout=() =>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    isLoggedIn = false
    window.location.href = "/"
  }
  console.log('login ' + isLoggedIn);
  return (
    <Container fluid className="sticky-header px-0">
      <navbar className="col-md-12 px-0 py-1">
        <div>
          <a className="navlink" href="/">
            <img
              src="/img/logo_mini.svg"
              width="42"
              height="42"
              alt="logo"
            />
          </a>
        </div>
        <div className="col-lg-5 col-md-7 col-ms-8 col-10">
          <Row className="justify-content-end">
            <a className="navlink" href="/dishes" > Dishes </a>
            <a className="navlink" href="/about" >About</a>
            {isLoggedIn
              ? <a className="navlink" href={"/profile/"+localStorage.userInfo} variant="light">{localStorage.userInfo}</a>
              : <button className="navlink" onClick={props.isLogin.bind(true)} variant="light">Log in</button>}
            {isLoggedIn
              ? <button className="navlink" onClick={handleLogout.bind()} variant="light">Log out</button>
              : <button className="navlink" onClick={props.isRegis.bind(true)} variant="light">Sign up</button>}  
            
          </Row>
           
        </div>
      </navbar>
    </Container>


  );
}

export default Header;
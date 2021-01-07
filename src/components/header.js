import React from 'react';
import {Container} from 'react-bootstrap';
//import axios from 'axios'
function Header(props) {
  let isLoggedIn = false
  if (localStorage.getItem('userInfo') !== null){
   isLoggedIn = true
  }
  const handleLogout=() =>{
    localStorage.removeItem("userInfo")
    isLoggedIn = false
    window.location.href = "/"
  }
  console.log('login ' + isLoggedIn);
  return (
    <Container fluid className="sticky-header px-0">
      <navbar className="col-md-12 px-0 ">
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
        <div>
          <a className="navlink" href="/dishes" > Dishes </a>
          <a className="navlink" href="/about" >About</a>
          {isLoggedIn 
            ? <button className="navlink" variant="light">{localStorage.userInfo}</button>
            : <button className="navlink" onClick={props.isLogin.bind(true)} variant="light">Log in</button>}
          {isLoggedIn
            ? <button className="navlink" onClick={handleLogout.bind()} variant="light">Log out</button>
            : <button className="navlink" onClick={props.isRegis.bind(true)} variant="light">Sign up</button>}  
            
        </div>
      </navbar>
    </Container>


  );
}

export default Header;
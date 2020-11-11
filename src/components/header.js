import React from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios'
function Header(props) {

  const getMethod = () => {
    axios.get('http://127.0.0.1:8000/hello/')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
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
          <a className="navlink" href="/about" onClick={getMethod} >About</a>
          <button className="navlink" onClick={props.isLogin.bind(true)} variant="light">Log in</button>
          <button className="navlink" onClick={props.isRegis.bind(true)} variant="light">Sign up</button>
        </div>
      </navbar>
    </Container>


  );
}

export default Header;
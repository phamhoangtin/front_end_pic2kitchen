import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
//import axios from 'axios'
const notLoginToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Header(props) {
  let query = useQuery()
  let predict = query.get("key")
  const [searchText, setSearch] = useState("");
  const [suggestList, setSuggest] = useState([])
  const [searchOption, setSearchOption] = useState("1")
  let isLoggedIn = false
  if (localStorage.getItem('userInfo') !== null) {
    isLoggedIn = true
  }
  const handleLogout = () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    isLoggedIn = false
    window.location.href = "/"
  }
  const handleChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("autocom").style.display = "block"
    }
    setSearch(e.target.value)
  }
  const handleSearch = (e) =>{
    setSearchOption(e.target.value)
  }
  const handleClick = () => {
    window.location.href = '/search_result?key=' + encodeURIComponent(searchText) + '&option=' + searchOption
  }
  // const firstUpdate = useRef(true);
  // useEffect (() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   if (searchText !== ""){
  //     Axios.get(
  //       "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
  //       { withCredentials: false }
  //     ).then(async res => {
  //       console.log(res)
  //       res.data.data.map((dish) => {
  //         dish.img = dish.img.replace('555x240', '360x225')
  //       })

  //       if (searchText == "") setSuggest([])
  //       else setSuggest(res.data.data)
  //     }).catch(async error => {
  //       console.log(error)

  //     })

  //   }
  //   else {
  //     setSuggest([])
  //   }
  //   console.log(searchText)

  // }, [searchText])
  return (
    <Container fluid className="sticky-header px-0">
      <navbar className="col-12 pl-1 py-1">
        <Container fluid>
        <Row className="mx-0 justify-content-start">
        <div className="mr-2">
          <a className="navlink" href="/">
            <img
              src="/img/logo_mini.svg"
              width="42"
              height="42"
              alt="logo"
            />
          </a>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-5 col-sm-10 col-10 custom-search-input px-2">
          <Row>
            <div className="search-input col-6 px-0">
              <input type="text" className="form-control" placeholder="Search" onChange={handleChange} />
              <div className="autocom" id="autocom">
                {suggestList.slice(0, 5).map((dish) => (
                  <li>{dish.name}</li>
                ))}
              </div>

            </div>
            <div className="col-lg-1 col px-0">
              <button onClick={handleClick} className="searchButton btn btn-lg py-0" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>

            <div className="col from-group px-0">
              <select className="form-control search-option" onChange={handleSearch} data-live-search="true">
                <option value="1" >Name</option>
                <option value="2" >Ingredient</option>
              </select>
            </div>
          </Row>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-6 col-12 px-0">
          <Row className="justify-content-end">

            <a className="navlink" href="/dishes" > Dishes </a>
            <a className="navlink" href="/about" >About</a>
            {isLoggedIn
              ? <a className="navlink" href={"/profile/" + localStorage.userInfo} variant="light">{localStorage.userInfo}</a>
              : <button className="navlink" onClick={props.isLogin.bind(true)} variant="light">Log in</button>}
            {isLoggedIn
              ? <button className="navlink" onClick={handleLogout.bind()} variant="light">Log out</button>
              : <button className="navlink" onClick={props.isRegis.bind(true)} variant="light">Sign up</button>}

          </Row>

        </div>
        </Row>
        
        </Container>
        
      </navbar>
    </Container>


  );
}

export default Header;
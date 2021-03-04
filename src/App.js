import React,{ useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Footer from './components/Footer'
import Header from './components/header';
import Content from './components/content';
import Login from './components/Login';
import Register from './components/Register';
import Dish from './components/Dish';
import Dishes from './components/Dishes';
import Recommendation from './components/Recommendation';
import Trending from './components/Trending';
import History from './components/History';
import Profile from './components/Profile';
import Result from './components/Result';
import Search from'./components/Search';
function App(){
  const [login, setLogin] = useState(false);
  const [regis, setRegis] = useState(false);

  const changeLoginState = (boolean) =>{
    setLogin(boolean);
  }
  const changeRegisState = (boolean) =>{
    setRegis(boolean);
  }
    return (
      <Router>
        <div className="App" >
          <Header isLogin={changeLoginState} isRegis = {changeRegisState}/>
          <Login isLogin={login} changeLoginState={changeLoginState}/>
          <Register isRegis={regis} changeRegisState={changeRegisState}/>
           <Switch>
              <Route exact path="/dish/:topic/:id" component={Dish}/>
              <Route exact path="/dishes" component={Dishes}/>
              <Route exact path="/"  component={Content} />
              <Route exact path="/recommendation" component={Recommendation} />
              <Route exact path="/trending" component={Trending} />
              <Route exact path="/history" component={History}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <Route exact path="/result/:image" component={Result}/>
              <Route exact path="/result/:id/:image" component={Result}/>
              <Route exact path="/search_result/" component={Search}/>
           </Switch>
          <Footer/>
        </div>
      </Router>
    );
}

export default App;

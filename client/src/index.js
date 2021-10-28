import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Daily from "./pages/Daily";
import Contact from "./pages/Contact";
import Nav from "./pages/Nav";
import 'bulma/css/bulma.min.css';

function Index () {
  //don't forget App
  return (
    <Router>
      <Nav/>      
      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blogs">
          <Blogs/>
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/app">
          <App/>
        </Route>
        <Route path="/daily">
          <Daily date={`/api/daily/${(new Date()).toDateString()}`}/>
        </Route>
      </Switch>
    </Router>

  
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

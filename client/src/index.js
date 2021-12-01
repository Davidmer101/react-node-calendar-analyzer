import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/toDo/Home.js";
import Contact from "./pages/toDo/Contact";
import Nav from "./pages/Nav";
import Custom from "./pages/toDo/Custom.js"
import Router from "./pages/Router.js"
import CalName from "./pages/views/DetailView.js"
import 'bulma/css/bulma.min.css';
import * as myApp from './App.js';

function Index () {
  //don't forget App
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/" element={<Nav onSignout = {myApp.handleSignoutClick}/>} >
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/:period/:type/:specific/:date" element={<Router/>} >    {/*{<Daily day={new Date()} */}
            <Route path="/:period/:type/:specific/:date/:detail" element={<CalName/>} />
          </Route>
          <Route path="/custom" element={<Custom/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  
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
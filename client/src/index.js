import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import Monthly from "./pages/Monthly.js";
import Contact from "./pages/Contact";
import Nav from "./pages/Nav";
import Custom from "./pages/Custom.js"
import Router from "./pages/router.js"
import CalName from "./pages/CalName.js"
import 'bulma/css/bulma.min.css';
import * as myDate from './date.js';
import * as myApp from './App.js';


function Index () {
  //don't forget App
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav onSignout = {myApp.handleSignoutClick}/>} >
          <Route path="/home" element={<Home />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/app" element={<App/>} />
          <Route path="/:period/:type/:specific/:date" element={<Router/>} >    {/*{<Daily day={new Date()} */}
            {/* <Route path=":calName" element={<CalName/>} /> */}
          </Route>
          <Route path="/weekly" element={<Weekly weekNum = {myDate.weekNumber(new Date())}/>} />
          <Route path="/monthly" element={ <Monthly monthNum = {(new Date()).getMonth()} />} />
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
reportWebVitals();
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import isSignedIn from "../App.js";
import * as myDate from '../date.js'

function Nav(props) {
     return(
        <>
          <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <NavBarSymbols />
            <div id="navbarBasicExample" class="navbar-menu"> 
                <LeftNavBarChocies />
                <RightNavBarChocies onSignout = {props.onSignout} />
            </div>  
        </nav>
            <Outlet />
        </>
    )
}

function NavBarSymbols () {
    return(
        <div class="navbar-brand">
        <Link to="/home" class="navbar-item" > 
        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img> */}
            
            <span class="icon-text">
                <span class="icon">
                <i class="fas fa-history"></i>
                </span>
                <span class="m-0 p-0 has-text-link" id = 'logo'>GCAnalyzer</span>
            </span>
        </Link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        </a>
    </div>
    )
}

function LeftNavBarChocies() {
    let today = new Date()
    let currentWeekNum = myDate.weekNumber(today)
    let currentMonthNum = (new Date()).getMonth()
    return (
        <div id="left-navbar-choices" class="navbar-start">
            <Link id={'daily'} to={`/daily/calName/all/${today.toDateString()}`} key={'period'} class="navbar-item" > Daily </Link>
            <Link to={`/weekly/calName/all/${currentWeekNum}`} class="navbar-item"> Weekly </Link>
            <Link id={`monthly`} to={`/monthly/calName/all/${currentMonthNum}`} class="navbar-item"> Monthly </Link> 
            <Link id= {`custom`} to="/custom" class="navbar-item"> Custom </Link> 
        </div>
    )
}

function RightNavBarChocies (props) {
    return (
        <div class="navbar-end" id="right-navbar-choices" >
        <div class="navbar-item has-dropdown is-hoverable">
            <span  class="navbar-item"> More </span>
            <div class="navbar-dropdown">
                <a disabled class="navbar-item">
                    About
                </a>
                <Link to="/contact" class="navbar-item"> Contatct Me </Link>
                <Link id={'refresh'} to="#" class="navbar-item"> Refresh Data </Link> 
                <hr class="navbar-divider"/> 
                <a class="navbar-item is-disabled">
                    Report an issue
                </a>
            </div>
        </div>

        <div class="navbar-item">
            <div  class="buttons"  >
                <button onClick = {props.onSignout} id='signout-button' class="button is-primary">
                    Sign Out
                </button>
            </div>
        </div>
    </div>
    )
}



//navebar burger and navebar menu toggle is-active when pressed
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

export default Nav;
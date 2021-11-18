import React from 'react';
import {Link} from 'react-router-dom';
import 'bulma/css/bulma.min.css';

function NavBarSymbols () {
    return(
        <div class="navbar-brand">
                <Link to="/" class="navbar-item" > 
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
    return (
        <div id="left-navbar-choices" class="navbar-start">
            <Link to="/daily" class="navbar-item" > Daily </Link>
            <Link to="/weekly" class="navbar-item"> Weekly </Link>
            <Link to="/monthly" class="navbar-item"> Monthly </Link> 
            <Link to="/custom" class="navbar-item"> Custom </Link> 
        </div>
    )
}

function RightNavBarChocies (props) {
    return (
        <div class="navbar-end" id="right-navbar-choices" >
                    <div class="navbar-item has-dropdown is-hoverable">
                        <Link to="/more" class="navbar-item"> More </Link>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <Link to="/app" class="navbar-item"> App </Link> 
                            <Link to="/contact" class="navbar-item"> Contatct Me </Link>
                            <hr class="navbar-divider"/> 
                            <a class="navbar-item">
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

function Nav(props) {
    return(
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <NavBarSymbols />
            <div  class="navbar-menu"> 
                < LeftNavBarChocies />
                < RightNavBarChocies onSignout = {props.onSignout} />
            </div>  
        </nav>
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
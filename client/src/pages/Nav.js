import React from 'react';
import {Link} from 'react-router-dom';
import 'bulma/css/bulma.min.css';


function Nav() {
    return(
        
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <Link to="/" class="navbar-item" > 
                {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img> */}
                    
                    <span class="icon-text">
                        <span class="icon">
                        <i class="fas fa-history"></i>
                        </span>
                        <span class="m-0 p-0 has-text-link" id = 'logo'>Lastweek</span>
                    </span>
                </Link>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu"> 
                <div class="navbar-start">
                    <Link to="/daily" class="navbar-item" > daily </Link>
                    <Link to="/weekly" class="navbar-item"> weekly </Link>
                    <Link to="/monthly" class="navbar-item"> Monthly </Link> 

                    
                </div>

                <div class="navbar-end">
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
                    
                    <div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
      <span>Content</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
      </div>
      <hr class="dropdown-divider"/>
      <div class="dropdown-item">
        <p>You simply need to use a <code>&lt;div&gt;</code> instead.</p>
      </div>
      <hr class="dropdown-divider"/>
      <Link to="/" class="dropdown-item">
        This is a link
      </Link>
    </div>
  </div>
</div>

                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>

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
import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as myRequestAndStore from './requestAndStore.js'
import axios from 'axios';
import RequestMyServer from './requestMyServer.js';


  let gapi = window.gapi
/**
   *  On load, called to load the auth2 library and API client library.
   */
  window.onload = handleClientLoad;
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
    function initClient() {
    gapi.client.init({
        // Client ID and API key from the Developer Console
      apiKey: 'AIzaSyBYxwNwT53EbvQNvhVCDD3FZW3KvTQWRBs',
      clientId: '958765352456-n0b4hg33876562lgerugi6qfei2jjaja.apps.googleusercontent.com',
      // Array of API discovery doc URLs for APIs used by the quickstart
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    
    }, function(error) {
      alert(JSON.stringify(error, null, 2));
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
    function updateSigninStatus(signedIn) {
    if (signedIn) {
      alert ('signing you in \n change page view to summary or daily')
      //end of this month  ex: Nov 31
      let dayAhead = new Date();
      dayAhead.setMonth(dayAhead.getMonth() + 1);
      dayAhead.setDate(0)

      //Aug Sep Oct Nov
      //three months ago Sept 1
      let dayBehind = new Date();
      dayBehind.setMonth(dayBehind.getMonth() - 2);
      dayBehind.setDate(1)

      myRequestAndStore.listOfCalendars(dayBehind, dayAhead)


    } else {
      alert("signing you out \n change view to home page")
    }
  }


  /**
   * functi
   *  Sign in the user upon button click.
   */
    function handleAuthClick(event) {
      try {
        if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
          alert ('already signed in ')
        } else {
          gapi.auth2.getAuthInstance().signIn();
        }
      } catch (error) {
        alert(error.message)
      }
  }

  /**
   *  Sign out the user upon button click.
   */
  export async function handleSignoutClick(event) {
    await sendDelete();
    gapi.auth2.getAuthInstance().signOut();
  }

  async function sendDelete(){
    try {
     let result = await axios ({
       method: 'delete',
       url: `${myRequestAndStore.starterURL}api/daily/`,
     })
    // alert(JSON.stringify(result))
    } catch (error) {
      alert('error in requestAndStore-> sendPost: ' + error.message)
    }
  };

  let App = () =>{
    return (
      <div className="App">
        <header className="App-header">
        < Homepage onClick={handleAuthClick} />
        </header>
      </div>
    );
  }
  
let LeftSection = (props) => {
  return (
    <div class="column is-three-fifths">
              <div id = "firstRead">
                <div class="block">
                  <h1 class="title" style={{color: "lightblue"}}>Analyze Your Calendar</h1>
                  <h6 class="subtitle" style={{color: "gray"}}>Made with Google Calendar API</h6>
                  <hr/>
                </div>
                <div class="block">
                  <p class = 'homePageParagraph'> Analyze and learn how you spent your past days, weeks, or months from your google calendar.</p> 
                <div class="block">
                  <p> Pressing the 'Authorize' button authorizes this web app to read your google calendar events.
                    Access to your calendar events data is terminated once you sign out. 
                    See <a class="tag is-primary is-light"> Privacy Policy </a> to learn more:
                </p>
                </div> 
                <div class="block">
                  <button onClick={props.onClick} id="authorize_button"  class="button is-primary">
                    <span class="icon">
                      <i class="fab fa-google"></i>
                    </span>
                    <span id='authorize_span'> Authorize</span>
                  </button>            
                </div>  
              </div>
              </div>
              
            </div>
  )
}

let RightSection = () => {
  return (
    <div class="column">
              <div id = 'authorize-view'>
                
                <p> Currently the app is not verifed by Google as it is in a developement mode. 
                  You can use the following email and password for authorization. 
                    </p>
                    <br/>
                  <ul>
                    <li>username: demofor426</li>
                    <li>password: Comp4262020</li>
                  </ul>
                  <br/>
                  <p>Feel free to log in to <a href="https://accounts.google.com/signin/v2/identifier?service=cl&passive=1209600&osid=1&continue=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&followup=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&flowName=GlifWebSignIn&flowEntry=ServiceLogin"> Google Calendar</a> and update events as well</p>
                  
              </div>
                       
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                 Front End Made with React
              </a>
              < RequestMyServer />
            </div>
  )
}
  
let Homepage = (props) => {
  return(
    <div class="hero-body">
        <div class="container">
          <div class="columns">
              <LeftSection onClick = {props.onClick} />
              < RightSection />
          </div>       
        </div>  
      </div>
  )
}
export default App;

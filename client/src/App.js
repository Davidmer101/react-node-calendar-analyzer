import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as myRequestAndStore from './requestAndStore.js'
import axios from 'axios';
import RequestMyServer from './requestMyServer.js';
import Contact from './pages/Contact.js';

class App extends React.Component {
  gapi = window.gapi;  
  // Client ID and API key from the Developer Console
  API_KEY = 'AIzaSyBYxwNwT53EbvQNvhVCDD3FZW3KvTQWRBs';
  CLIENT_ID = '958765352456-n0b4hg33876562lgerugi6qfei2jjaja.apps.googleusercontent.com';
  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  authorizeButton = document.getElementById('authorize_button');
  signoutButton = document.getElementById('signout_button');


  handleClick = () => {
    this.gapi.load('client:auth2', () => {
      console.log('loaded client')

      this.gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      })

      this.gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      this.gapi.auth2.getAuthInstance().signIn()
      .then(() => { 
        this.updateSignInStatus(true)
      })
      .catch(err => alert('trying to sign in but: ' + err.message))
    })
  }

  updateSignInStatus(signedIn) {
    if (signedIn) {
      //end of this month  ex: Nov 31
      let dayAhead = new Date();
      dayAhead.setMonth(dayAhead.getMonth() + 1);
      dayAhead.setDate(0)

      //Aug Sep Oct Nov
      //three months ago Sept 1
      let dayBehind = new Date();
      dayBehind.setMonth(dayBehind.getMonth() - 2);
      dayBehind.setDate(1)

      alert(dayBehind.toLocaleDateString())
      alert(dayAhead.toLocaleDateString())

      myRequestAndStore.listOfCalendars(dayBehind, dayAhead)


    }
  }

  render() {
    // let msg 

    // axios.get("/api")
    // .then(res => {
    //   alert('axios')
    //   msg = res.data.message
    //   alert('msg is ' + msg)
      
    // })
    
    // fetch("/api")
    //   .then((res) => res.json())
    //   .then((data) => {alert(data.message); msg = data.message});
 
    return (
      <div className="App">
        <header className="App-header">
        
        < Homepage onClick={this.handleClick}/>
        < RequestMyServer />
          <p>
            <button onClick={this.handleClick}> List Events  </button>
             {/* <!--Add buttons to initiate auth sequence and sign out--> */}
            <button id="authorize_button" style={{display: "none"}}>Authorize</button>
            <button id="signout_button" style={{display: "none"}}>Sign Out</button>
  
          </p>
  
          <pre id="content" style={{"whiteSpace": "pre-wrap"}}></pre>
  
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
}

let Homepage = (props) => {
  return(
    <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-three-fifths">
              <div id = "firstRead">
                <div class="block">
                  <h1 class="title" style={{color: "lightblue"}}>Analyze Your Calendar</h1>
                  <h6 class="subtitle" style={{color: "gray"}}>Made with Google Calendar API</h6>
                </div>
                <div class="block">
                  <p class = 'homePageParagraph'> Analyze and learn how you spent your past days, weeks, or months from your google calendar.  
                    This web app analyzes how you spent your time by feching events from your google calendar.  
                </p>  
              </div>
              </div>
              
            </div>
            <div class="column">
              
              <div id = 'authorize-view'>
                <div class="block">
                  <p> Pressing the 'Authorize' button below authorizes this web app to read your google calendar events.
                    Access to your calendar events data is terminated once you sign out. 
                    See <a class="tag is-primary is-light"> Privacy Policy </a> to learn more:
                </p>
                </div> 
                <div class="block">
                  <button onClick={props.onClick} id="authorize_button"  class="button is-primary">
                    <span class="icon">
                      <i class="fab fa-google"></i>
                    </span>
                    <span> Authorize</span>
                  </button>            
                </div> 
                <div class="block"> 
                  Erase your data by pressing:
                </div>
                <Contact />
                <hr/>
                <p> Currently the app is not verifed by Google as it is in a developement process. 
                  You can use the following email and password for authorization. 
                    </p>
                    <br/>
                  <ul>
                    <li>username: demofor426</li>
                    <li>password: Comp4262020</li>
                  </ul>
              </div>
            </div>
          </div>       
        </div>  
      </div>
  )
}
export default App;

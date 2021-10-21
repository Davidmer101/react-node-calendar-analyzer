import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as myRequestAndStore from './requestAndStore.js'
import axios from 'axios';
import RequestMyServer from './requestMyServer.js';

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
      .catch(err => alert(err.message))
    })
  }

  updateSignInStatus(signedIn) {
    if (signedIn) {
      myRequestAndStore.listOfCalendars()
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
        < RequestMyServer />
          <p> Edit <code>src/App.js</code> and save to reload. </p>
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


export default App;

// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function RequestMyServer() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  
  return (
    <div >
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default RequestMyServer;
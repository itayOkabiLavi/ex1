import Login from './components/Login';
import './api.js'
import ChatComp1 from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { api } from './api.js';

function App() {
  let [token, setToken] = useState(() => {
    return sessionStorage.getItem("userToken");      
  });

  useEffect(() => {
    sessionStorage.setItem("userToken", token);
  }, [token]);

  let loginComp = <Login setToken={setToken} />

  if (token == "" || token == undefined || token == 'undefined' || token == null||token == 'null') {
    return loginComp;
  } else {
    return (
      <ChatComp1 userToken={token} setToken={setToken}/>
    );
  }
}
export default App;


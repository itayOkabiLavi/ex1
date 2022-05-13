import Login from './components/Login';
import './api.js'
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  let [state, setState] = useState({
    authed: false,
    userToken: undefined,
  });
  let loginComp = <Login setToken={setState}/>

  if (state.authed == false) {
    return loginComp;
  }
  return (
    <ChatComp userToken={state.userToken} setToken={setState} user={state.user}/>
  );
}
export default App;


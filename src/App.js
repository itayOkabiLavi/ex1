import Login from './components/Login';
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const server = 'https://localhost:7135/api/'
  let [state, setState] = useState({
    authed: false,
    user: undefined,
  });
  let loginComp = <Login setToken={setState} URLport={server}/>

  if (state.authed == false) {
    return loginComp;
  }
  return (
    <ChatComp user={state.user} setToken={setState} URLport={server}/>
  );
}
export default App;


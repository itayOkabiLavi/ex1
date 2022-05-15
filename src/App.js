import Login from './components/Login';
import './api.js'
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  let [state, setState] = useState({
    authed: false,
    user: undefined,
  });
  let loginComp = <Login setToken={setState}/>

  if (state.authed == false) {
    return loginComp;
  }
  return (
<<<<<<< HEAD
    <ChatComp user={state.user} setToken={setState}/>
=======
    <ChatComp userToken={state.userToken} setToken={setState} user={state.user}/>
>>>>>>> d386545d08e20ad424dca7bbe4c8fee619d7b2e4
  );
}
export default App;


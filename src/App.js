import Login from './components/Login';
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  let [state, setState] = useState(() => {
    const savedAuthed = sessionStorage.getItem('authed');
    const savedUserName = sessionStorage.getItem('userName');
    const initialValue = savedAuthed == 'true' ? true : false;
    return {
      authed: initialValue,
      userName: savedUserName,
    };
  });
  let loginComp = <Login setToken={setState} />

  useEffect(() => {
    sessionStorage.setItem('authed', state.authed)
    sessionStorage.setItem('userName', state.userName)
  }, [state])

  if (state.authed == false) {
    return loginComp;
  }
  return (
    <ChatComp userName={state.userName} setToken={setState}/>
  );
}
export default App;


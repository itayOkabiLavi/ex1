import Login from './components/Login';
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  let [state, setState] = useState(() => {
    const savedAuthed = sessionStorage.getItem('authed');
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    const initialValue = savedAuthed == 'true' ? true : false;
    return {
      authed: initialValue,
      user: savedUser,
    };
  });
  let loginComp = <Login setToken={setState} />

  useEffect(() => {
    sessionStorage.setItem('authed', state.authed)
    sessionStorage.setItem('user', JSON.stringify(state.user))
  }, [state])

  if (state.authed == false) {
    return loginComp;
  }
  return (
    <ChatComp user={state.user} setToken={setState}/>
  );
}
export default App;


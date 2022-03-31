import Login from './components/Login';
import ChatComp from './components/ChatComp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  let [authed, setAuthed] = useState(() => {
    const saved = sessionStorage.getItem('authed');
    const initialValue = saved == 'true' ? true : false;
    return initialValue || false;
  });
  useEffect(() => {
    sessionStorage.setItem('authed', authed)
  }, [authed])

  if (authed == false) {
    return <Login setToken={setAuthed}/>
  }
  return (
    <ChatComp />
  );
}
export default App;


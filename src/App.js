import './App.css';
import Login from './containers/Login';
import ChatItem from './components/ChatItem'
import React, { useEffect, useState } from 'react';

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
    console.log('login')
    return <Login setToken={setAuthed} />
  }
  return (
    <ChatItem />
  );
}
export default App;


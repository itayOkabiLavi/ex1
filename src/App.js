import React from 'react';
import { HashRouter, Routes, Route,useRoutes } from "react-router-dom";
import './App.css';
import ChatItem from './components/ChatItem';
import Login from './containers/Login';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <ChatItem/> } />
      <Route path="login" element={ <Login/> } />
    </Routes>
  </div>
    // <HashRouter >
    //   <Routes>
    //     <Route exact path="/" element={<div className="App">
    //       <ChatItem />
    //     </div>}>
    //     <Route exact path="/login" element={<div className="App">
    //       <Login />
    //     </div>} />
    //     </Route>
    //     </Routes>
    // </HashRouter>
  );
}

export default App;

import React from 'react';
import ChatComp from './components/ChatComp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div id="app">
        <ChatComp/>
      </div>
    );
  }
  
}

export default App;

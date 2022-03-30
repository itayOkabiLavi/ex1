import React from 'react';
import './App.css';
import ChatComp from './components/ChatComp';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="App">
        <ChatComp/>
      </div>
    );
  }
  
}

class Contact {
  constructor(name, pwd=null, is_mail = false, contact_id, img_src = '') {
    this.nickname = name
    this.password = pwd
    this.is_mail = is_mail
    this.contact_info = contact_id
    this.img_src = img_src
  }
}

export default App;

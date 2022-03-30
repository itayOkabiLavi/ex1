import React from "react";
import Message from "./Message";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";

import { Form, FormGroup } from "react-bootstrap";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.messages = []
        this.state = {
            messages: [],
            msgText: "",
            msgImg: "",
            msgAud: ""
        }
    }
    msgTextChanged(event) { this.setState({msgText: event.target.value})}
    sendMessage() {
        this.setState({
            messages: this.messages.push(
                <Message 
                    fromMe={true}
                    type="text"
                    content={this.state.msgText}
                />
            )
        })
    }
    render() {
        return (
            <div id='cid_bg'>
                <div id='cid_chat'>
                {this.messages}
                </div>
                <div id='cid_inputs'>
                    <input 
                        id='cid_text'
                        value={this.state.msgText}
                        onChange={(e)=>{this.msgTextChanged(e)}}
                    />
                    <div id='cid_buttons'>
                        <button className="btn btn-primary btn-circle"><i className="bi bi-three-dots-vertical"></i></button>
                        <button className="btn btn-primary btn-circle" onClick={()=>this.sendMessage()}><i className="bi bi-send-fill"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatDisplay;
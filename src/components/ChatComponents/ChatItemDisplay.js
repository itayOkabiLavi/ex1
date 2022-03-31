import React from "react";
import { render } from 'react-dom';

import Message from "./Message";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";

import { Form, FormGroup } from "react-bootstrap";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.i = 0
        this.messages = []
        this.state = {
            messages: [],
            msgText: "",
            msgImg: "",
            msgAud: "",
            now: new Date().toLocaleString()
        }
        this.messages.push(
            <Message 
                fromMe={false} 
                type="text" 
                date={t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()} 
            content={"Start chatting with " + this.props.id + "!"}/>
        )
    }
    msgTextChanged(event) { this.setState({msgText: event.target.value})}
    sendMessage() {
        let t = new Date()
        this.setState({
            messages: this.messages.push(
                <Message 
                    fromMe={true}
                    type="text"
                    content={this.state.msgText}
                    date={new Date().toLocaleString()}
                />
            )
        })
    }
    render() {
        return (
            <div className='cid_bg'>
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
                        <button className="btn btn-circle my_btn"><i className="bi bi-three-dots-vertical"></i></button>
                        <button className="btn btn-circle my_btn" onClick={()=>this.sendMessage()}><i className="bi bi-send-fill"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatDisplay;
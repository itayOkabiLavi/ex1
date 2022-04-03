import React from "react";
import { render } from 'react-dom';

import Message from "./Message";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";

import { Form, FormGroup, Card } from "react-bootstrap";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.i = 0
        this.id = this.props.id
        this.key = this.id
        let t = new Date();
        this.childComponentWillUnmount = props.childComponentWillUnmount
        this.state = {
            msgText: props.state.msgText,
            msgImg: props.state.msgImg,
            msgAud: props.state.msgAud,
            messages: [...props.state.messages],
            now: new Date().toLocaleString(),
        }
        console.log('props.state', {...props.state})
        this.messages = [...props.state.messages]
        console.log('this.messages', [...this.messages])
        if (this.messages.length == 0) {
            this.messages.push(
                <Message
                    fromMe={false}
                    type="text"
                    date={t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()}
                    content={"Start chatting with " + this.props.id + "!"} />
            )
        }
    }
    msgTextChanged(event) { this.setState({ msgText: event.target.value }) }
    sendMessage() {
        let t = new Date()
        let updatedMessages = this.messages.push(
            <Message
                fromMe={true}
                type="text"
                content={this.state.msgText}
                date={new Date().toLocaleString()}
            />)
        this.setState({
            ...this.state,
            messages: updatedMessages
        })
        console.log(this.state)
    }
    componentWillUnmount() {
        console.log('componentWillUnmount', [...this.messages])
        let newState = {
            msgText: this.state.msgText,
            msgImg: this.state.msgImg,
            msgAud: this.state.msgAud,
            messages: [...this.messages]
        }
        //this.setState(newState)
        this.childComponentWillUnmount({
            msgText: this.state.msgText,
            msgImg: this.state.msgImg,
            msgAud: this.state.msgAud,
            messages: [...this.messages],
        });
    }
    render() {
        return (
            <div className='cid_bg' key={this.key}>
                <div id='cid_chat'>
                    {this.messages}
                </div>
                <div id='cid_inputs'>
                    <input
                        id='cid_text'
                        value={this.state.msgText}
                        onChange={(e) => { this.msgTextChanged(e) }}
                    />
                    <div id='cid_buttons'>
                        <button 
                            className="btn btn-circle my_btn" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#uploadOptions"
                            >
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <Card className="collapse" id="uploadOptions">
                            <button id="uploadImage" className="btn-circle"><i class="bi bi-file-image"></i></button>
                            <button id="record" className="btn-circle"><i class="bi bi-mic-fill"></i></button>
                            <button id="uploadVideo" className="btn-circle"><i class="bi bi-film"></i></button>
                            <button id="uploadAudio" className="btn-circle"><i class="bi bi-file-music"></i></button>
                        </Card>
                        <button className="btn btn-circle my_btn" onClick={() => this.sendMessage()}><i className="bi bi-send-fill"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatDisplay;
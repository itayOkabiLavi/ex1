import React from "react";
import { render } from 'react-dom';
import Message from "./Message";
import MultiMediaButton from "./MultiMediButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";

import { Form, FormGroup, Card, Modal } from "react-bootstrap";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.i = 0
        this.id = this.props.id
        this.key = this.id
        let t = new Date();
        this.childComponentWillUnmount = props.childComponentWillUnmount
        this.state = {
            msgText: "",
            msgMulMedCont: "",
            msgMulMedType: "",
            msgMulMedPrev: "",
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
            msgMulMedPrev: this.state.msgMulMedPrev,
            messages: [...this.messages]
        }
        //this.setState(newState)
        this.childComponentWillUnmount({
            msgText: this.state.msgText,
            msgMulMedPrev: this.state.msgMulMedPrev,
            messages: [...this.messages],
        });
    }
    showMultiMediaWindow = (event,type) => { 
        event.preventDefault()
        console.log(type)
        this.setState({
        multiMediaType: type,
        multiMediaWindowShow: true
    })}
    changeMulMedContent = (content, type, comp) => { 
        this.setState({ 
            msgMulMedCont: content,
            msgMulMedType: type,
            msgMulMedPrev: comp
        }) 
        console.log("comp = ", comp)
        
    }
    render() {
        return (
            <div className='cid_bg' key={this.key}>
                <div id='cid_chat'>
                    {this.messages}
                </div>
                <div id='cid_inputs'>
                    <Card key="mulMedContainer" id="mulMedContainer" hidden={this.state.msgMulMedCont=="" ? true : false}>
                        {this.state.msgMulMedPrev}
                        <button onClick={(e)=>{this.setState({
                            msgMulMedPrev: "",
                            msgMulMedCont: "",
                            msgMulMedType: "",
                            msgMulMedPrev: ""
                        })}}><i class="bi bi-x-lg"></i></button>
                    </Card>
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
                            <MultiMediaButton 
                                key="image"
                                type="image" 
                                icon={<i className="bi bi-file-image icon_circle"></i>}
                                uploadMulMed={this.changeMulMedContent}
                            />
                            <MultiMediaButton 
                                key= "audio"
                                type="audio" 
                                icon={<i className="bi bi-file-music icon_circle"></i>}
                                uploadMulMed={this.changeMulMedContent}
                            />
                            <MultiMediaButton 
                                key="video"
                                type="video" 
                                icon={<i className="bi bi-film icon_circle"></i>}
                                uploadMulMed={this.changeMulMedContent}
                            />
                        </Card>
                        <button className="btn btn-circle my_btn" onClick={() => this.sendMessage()}><i className="bi bi-send-fill"></i></button>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatDisplay;
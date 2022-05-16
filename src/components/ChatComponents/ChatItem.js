import React, { useState } from 'react';
import { api } from '../../api';
import './ChatItem.css'
import { Card, Row } from 'react-bootstrap';
import ChatDisplay from './ChatItemDisplay';
const ChatItem1=(props)=>{
    let server = props.server;
    let userToken=props.userToken;
    let aName=props.name;
    let aImg=props.img;
    let id = props.name;
    let key = id;
    let display="";
    let maxSummary=10;
    let callBack=props.callBack;
    let [lastMessage,setLastMessage]=useState(props.lastMessage);
    let [lastMessageObj,setLastMessageObj]=useState(props.lastMessageObj);
    const showDisplay = () => {
        display = <ChatDisplay
            server={server}
            userToken={userToken}
            id={id}
            key={key}
            updateLastMessage={(lastMessage) => {
                setLastMessage(lastMessage);
                setLastMessageObj(messageSummary(lastMessage));
            }} />
        callBack(display, aName);
    }
    const messageSummary=(lm)=> {
        var mulMedIcon = ""
        switch (lm.type) {
            case "image":
                mulMedIcon = <i className="bi bi-file-earmark-image"></i>
                break;
            case "audio":
                mulMedIcon = <i className="bi bi-file-earmark-music"></i>
                break;
            case "video":
                mulMedIcon = <i className="bi bi-film"></i>
        }
        var summary = lm.content.txt
        if (summary.length > maxSummary) summary = new String().concat(summary.substring(0, maxSummary), " ...")
        var message = lm.type == "text" ? <h2>{summary}</h2>
            : <span>{mulMedIcon}<h2>{summary}</h2></span>
        return message
    }
    return (
        <div id='chatCard' key={key} onClick={(e) => { showDisplay() }}>
            <img src={aImg} />
            <div id='textedInfos'>
                <div id='addresseeInfo'>
                    <h1>{aName}</h1>
                    <small></small>
                </div>
                <div id='msgsInfo'>
                    {lastMessageObj}
                    <small>
                        {lastMessage.date.time}
                        <br />
                        {lastMessage.date.date}
                    </small>
                </div>
            </div>
        </div>
    );
}

class ChatItem extends React.Component {
    constructor(prop) {
        super(prop)
        this.server = prop.server
        this.userToken = this.props.userToken
        this.aName = prop.name
        this.aImg = prop.img
        this.id = this.aName
        this.key = this.id
        this.display = ""
        this.maxSummary = 10
        this.callBack = prop.callBack
        let lastMObj = {
            type: "text",
            content: { txt: prop.lastMessage },
            date: {
                date: prop.lastDate,
                time: prop.lastDate
            },
        }
        this.state = {
            lastMessage: prop.lastMessage,
            lastMessageObj: this.messageSummary(prop.lastMessage),
            savedState: {
                messages: prop.messages,
                msgText: "",
                msgImg: "",
                msgAud: ""
            }
        }

    }
    showDisplay = () => {
        this.display = <ChatDisplay
            server={this.server}

            userToken={this.userToken}
            id={this.aName}
            key={this.key}
            childComponentWillUnmount={this.childComponentWillUnmount}
            updateLastMessage={(lastMessage) => {
                this.setState({
                    lastMessage: lastMessage,
                    lastMessageObj: this.messageSummary(lastMessage)
                })
            }}
            state={this.state.savedState} />
        this.callBack(this.display, this.aName);
    }
    messageSummary(lm) {
        var mulMedIcon = ""
        switch (lm.type) {
            case "image":
                mulMedIcon = <i className="bi bi-file-earmark-image"></i>
                break;
            case "audio":
                mulMedIcon = <i className="bi bi-file-earmark-music"></i>
                break;
            case "video":
                mulMedIcon = <i className="bi bi-film"></i>
        }
        var summary = lm.content.txt
        if (summary.length > this.maxSummary) summary = new String().concat(summary.substring(0, this.maxSummary), " ...")
        var message = lm.type == "text" ? <h2>{summary}</h2>
            : <span>{mulMedIcon}<h2>{summary}</h2></span>
        return message
    }
    childComponentWillUnmount = (oldState) => {
        /*
        fetch()
        */
        this.setState({
            savedState: {
                messages: [...oldState.messages],
                msgText: oldState.msgText,
                msgImg: oldState.msgImg,
                msgAud: oldState.msgAud,

            },
        })
    }

    render() {
        return (
            <div id='chatCard' key={this.key} onClick={(e) => { this.showDisplay() }}>
                <img src={this.aImg} />
                <div id='textedInfos'>
                    <div id='addresseeInfo'>
                        <h1>{this.aName}</h1>
                        <small></small>
                    </div>
                    <div id='msgsInfo'>
                        {this.state.lastMessageObj}
                        <small>
                            {this.state.lastMessage.date.time}
                            <br />
                            {this.state.lastMessage.date.date}
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatItem1
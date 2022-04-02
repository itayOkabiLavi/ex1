import React from 'react';
import './ChatItem.css'
import { Card, Row } from 'react-bootstrap';
import ChatDisplay from './ChatItemDisplay';


class ChatItem extends React.Component {
    constructor(prop) {
        super(prop)
        this.aName = prop.name
        this.aImg = prop.img
        this.id = this.aName
        this.key = this.id
        this.state = {
            lastMessage: "Start chatting!",
            lastActivityDate: "00:00",
            savedState: {
                messages: [],
                msgText: "",
                msgImg: "",
                msgAud: "",
                now: new Date().toLocaleString()
            }
        }
        console.log('savedState',this.state.savedState)
        this.display = <ChatDisplay id={this.aName} key={this.key} childComponentWillUnmount={this.childComponentWillUnmount} state={this.state.savedState} />
        this.maxSummary = 30
        this.callBack = prop.callBack
    }
    updateChatInfo(content, time) {
        this.setState({
            lastMessage: content,
            lastActivityDate: time
        })
    }
    messageSummary() {
        var message = this.state.lastMessage
        if (message.length <= this.maxSummary) {
            return message;
        }
        return message.substring(0, this.maxSummary);
    }
    childComponentWillUnmount = (data) => {
        console.log('data', { ...data })
        this.setState({
            savedState: {
                messages: [...data.messages],
                msgText: data.msgText,
                msgImg: data.msgImg,
                msgAud: data.msgAud,

            },
        })
        console.log('newState', this.state.savedState)
    }
    render() {
        this.display = <ChatDisplay id={this.aName} key={this.key} childComponentWillUnmount={this.childComponentWillUnmount} state={this.state.savedState} />
        return (
            <div id='chatCard' key={this.key} onClick={(e) => { this.callBack(this.display, this.aName); console.log('chatitem'); }}>
                <img src={this.aImg} />
                <div id='textedInfos'>
                    <div id='addresseeInfo'>
                        <h1>{this.aName}</h1>
                        <small></small>
                    </div>
                    <div id='msgsInfo'>
                        <h2>{this.messageSummary()}</h2>
                        <small>{this.lastActivityDate}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatItem
import React from 'react';
import './ChatItem.css'
import { Card, Row } from 'react-bootstrap';
import ChatDisplay from './ChatItemDisplay';


class ChatItem extends React.Component{
    constructor(prop) {
        super(prop)
        this.aName = prop.name
        this.aImg = prop.img
        this.state= {
            lastMessage: "Start chatting!",
            lastActivityDate: "00:00"
        }
        this.display = <ChatDisplay/>
        this.maxSummary = 30
        this.callBack = prop.callBack
    }
    updateChatInfo ( content, time) {
        this.setState({
            lastMessage: content,
            lastActivityDate: time
        })
    }
    messageSummary () {
        var message = this.state.lastMessage
        if (message.length <= this.maxSummary) {
            return message;
        }
        return message.substring(0, this.maxSummary);
    }
    render() {
        return (
            <Card id='chatCard' onClick={(e)=>{this.callBack(this.display, this.aName)}}>
                <img src={this.aImg}/>
                <div id='chatinfo'>
                    <div id='addresseeInfo'>
                        <h1>{this.aName}</h1>
                        <small></small>
                    </div>
                    <div id='msgsInfo'>
                        <h2>{this.messageSummary()}</h2>
                        <small>{this.lastActivityDate}</small>
                    </div>
                </div>
            </Card>
        );
    }
}

export default ChatItem
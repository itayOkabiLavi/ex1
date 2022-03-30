import React from 'react';
import './ChatItem.css'
import { Card, Row } from 'react-bootstrap';
import ChatDisplay from './ChatItemDisplay';


class ChatItem extends React.Component{
    constructor(prop) {
        super(prop)
        this.aName = prop.name
        this.aImg = prop.img
        this.lastMessage = "Start chatting!"
        this.lastActivityDate = "99:99"
        this.display = <ChatDisplay/>
        this.maxSummary = 30
    }
    messageSummary () {
        var message = this.lastMessage
        if (message.length <= this.maxSummary) {
            return message;
        }
        return message.substring(0, this.maxSummary);
    }
    render() {
        return (
            <Card id='chatCard'>
                <img src={this.aImg}/>
                <div id='chatinfo'>
                    <div id='addresseeInfo'>
                        <h1>{this.aName}</h1>
                        <small></small>
                    </div>
                    <div id='msgsInfo'>
                        <h2>{this.messageSummary()}</h2>
                        <small>15:00</small>
                    </div>
                </div>
            </Card>
        );
    }
}

export default ChatItem
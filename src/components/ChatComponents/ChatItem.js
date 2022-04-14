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
            lastMessage: prop.lastMessage,
            savedState: {
                messages: prop.messages,
                msgText: "",
                msgImg: "",
                msgAud: ""
            }
        }
        console.log('savedState',this.state.savedState)
        this.display = ""
        this.maxSummary = 30
        this.callBack = prop.callBack
    }
    showDisplay = () => {
        this.display = <ChatDisplay 
            id={this.aName} 
            key={this.key} 
            childComponentWillUnmount={this.childComponentWillUnmount} 
            updateLastMessage={(lastMessage)=>(this.setState({lastMessage: lastMessage}))}
            state={this.state.savedState} />
        this.callBack(this.display, this.aName);
        console.log('chatitem');
    }
    messageSummary() {
        var lm = this.state.lastMessage
        console.log('lm',lm)
        var message = lm.type == "text" ? lm.content.txt : lm.type + lm.content.txt
        console.log('msg',message)
        if (message.length <= this.maxSummary) {
            return message;
        }
        return new String().concat(message.substring(0, this.maxSummary), " ...") ;
    }
    childComponentWillUnmount = (oldState) => {
        console.log('data', { ...oldState })
        this.setState({
            savedState: {
                messages: [...oldState.messages],
                msgText: oldState.msgText,
                msgImg: oldState.msgImg,
                msgAud: oldState.msgAud,

            },
        })
        console.log('newState', this.state.savedState)
    }
    render() {
        console.log("i am ", this)
        return (
            <div id='chatCard' key={this.key} onClick={(e) => { this.showDisplay() }}>
                <img src={this.aImg} />
                <div id='textedInfos'>
                    <div id='addresseeInfo'>
                        <h1>{this.aName}</h1>
                        <small></small>
                    </div>
                    <div id='msgsInfo'>
                        <h2>{this.messageSummary()}</h2>
                        <small>
                            {this.state.lastMessage.date.time} 
                            <br/> 
                            {this.state.lastMessage.date.date}
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatItem
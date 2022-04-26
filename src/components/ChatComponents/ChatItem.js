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
        this.display = ""
        this.maxSummary = 10
        this.callBack = prop.callBack
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
            id={this.aName} 
            key={this.key} 
            childComponentWillUnmount={this.childComponentWillUnmount} 
            updateLastMessage={(lastMessage)=>{this.setState({
                lastMessage: lastMessage,
                lastMessageObj: this.messageSummary(lastMessage)
                })}}
            state={this.state.savedState} />
        this.callBack(this.display, this.aName);
    }
    messageSummary(lm) {
        var mulMedIcon = ""
        switch (lm.type){
            case "image":
                mulMedIcon = <i class="bi bi-file-earmark-image"></i>
                break;
            case "audio":
                mulMedIcon = <i class="bi bi-file-earmark-music"></i>
                break;
            case "video":
                mulMedIcon = <i class="bi bi-film"></i>
        }
        var summary = lm.content.txt
        if (summary.length > this.maxSummary) summary = new String().concat(summary.substring(0, this.maxSummary), " ...")
        var message = lm.type == "text" ? <h2>{summary}</h2> 
         : <span>{mulMedIcon}<h2>{summary}</h2></span>
        return message
    }
    childComponentWillUnmount = (oldState) => {
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
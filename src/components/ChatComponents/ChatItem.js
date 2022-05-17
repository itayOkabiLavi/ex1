import React, { useState } from 'react';
import { api } from '../../api';
import './ChatItem.css'
import { Card, Row } from 'react-bootstrap';
import ChatDisplay from './ChatItemDisplay';
const ChatItem=(props)=>{
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
    const showDisplay = () => {
        display = <ChatDisplay
            server={server}
            userToken={userToken}
            id={id}
            key={key}
            updateLastMessage={(lastMessage) => {
                setLastMessage(lastMessage);
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
                    {messageSummary(lastMessage)}
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


export default ChatItem
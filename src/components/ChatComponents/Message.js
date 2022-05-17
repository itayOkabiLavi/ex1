import React from "react";
import './Message.css'
import { Card } from "react-bootstrap";
const Message = (props) => {
    let fromMe = props.fromMe
    let id;
    if (props.fromMe)
        id = 'fromMe';
    else
        id = 'toMe';
    let txtContent = props.txtContent
    let mmContent = props.mmContent
    let comp = ""
    let key = txtContent != "" ? txtContent : mmContent;
    let type = props.type
    let date = props.date;
    switch (type) {
        case "image":
            comp = <img key={mmContent} id="mulMedMsg" src={mmContent} />
            break;
        case "audio":
            comp = <audio key={mmContent} id="mulMedMsg" controls>
                <source src={mmContent} type={props.srcType} />
            </audio>
            break;
        case "video":
            comp = <video key={mmContent} id="mulMedMsg" controls autoPlay muted>
                <source src={mmContent} type={props.srcType} />
            </video>
            break;

    }
    mmContent = comp;
    return (
        <div className="msg" id={id} key={key}>
            {mmContent}
            <h2>{txtContent}</h2>
            <small>{date.time} {date.date}</small>
        </div>
    );
}


export default Message;
import React from "react";
import './Message.css'
import { Card } from "react-bootstrap";

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.fromMe = props.fromMe
        if (props.fromMe) this.id = 'fromMe';
        else this.id = 'toMe';
        this.txtContent = props.txtContent
        this.mmContent = props.mmContent
        let comp = ""
        this.key = this.txtContent != "" ? this.txtContent : this.mmContent;
        //this.key = props.key;
        this.type = props.type
        switch (this.type) {
            case "image":
                comp = <img key={props.mmContent} id="mulMedMsg" src={props.mmContent} />
                break;
            case "audio":
                comp = <audio key={props.mmContent} id="mulMedMsg" controls>
                    <source src={props.mmContent} type={props.srcType} />
                </audio>
                break;
            case "video":
                comp = <video key={props.mmContent} id="mulMedMsg" controls autoPlay muted>
                    <source src={props.mmContent} type={props.srcType} />
                </video>
                break;
        }
        this.mmContent = comp
        this.date = props.date
    }
    render() {
        return (
            <div className="msg" id={this.id} key={this.key}>
                {this.mmContent}
                <h2>{this.txtContent}</h2>
                <small>{this.date.time} {this.date.date}</small>
            </div>
        );
    }
}

export default Message;
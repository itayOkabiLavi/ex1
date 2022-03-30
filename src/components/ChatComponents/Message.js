import React from "react";
import './Message.css'
import { Card } from "react-bootstrap";

class Message extends React.Component{
    constructor(props) {
        super(props)
        this.fromMe = props.fromMe
        if (props.fromMe) this.id='fromMe';
        else this.id='toMe';
        this.content = "asd"
        this.type = props.type
        switch (this.type) {
            case "text" :
                this.content = <h2>{props.content}</h2>
                break;
            case "img":
                this.content = <img src={props.content}/>
                break;
            case "audio":
                this.content = "audio???"
                break;
        }
        this.date = props.date
    }
    render() {
        return(
            <div class="msg" id={this.id}>
                {this.content}
                <small>{this.date}</small>
            </div>
        );
    }
}

export default Message;
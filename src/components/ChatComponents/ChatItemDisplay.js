import React, { useEffect, useState } from "react";
import { render } from 'react-dom';
import Message from "./Message";
import MultiMediaButton from "./MultiMediButton";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";
import { api } from '../../api.js'
import { Form, FormGroup, Card, Modal } from "react-bootstrap";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.updateLastMessage = props.updateLastMessage;
        this.server = props.server;
        this.userToken = this.props.userToken
        this.i = 0
        this.id = this.props.id
        this.key = this.id
        this.showRecorder = false
        this.childComponentWillUnmount = props.childComponentWillUnmount
        this.state = {
            msgText: "",
            msgMulMedCont: "",
            msgMulMedType: "text",
            msgMulMedPrev: "",
            messages: [...props.state.messages],
            now: { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() },
        }

        this.messages = [...props.state.messages];
        this.componentDidMount();
    }

    msgTextChanged(event) { this.setState({ msgText: event.target.value }) }
    async sendMessage() {
        if ((this.state.msgText == "" || this.state.msgText == undefined)
            && (this.state.msgMulMedCont == "" || this.state.msgMulMedCont == undefined)) { return }
        let type = this.state.msgMulMedType != undefined ? this.state.msgMulMedType : 'text'
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.userToken);
        var requestOptions1 = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        //var res = (await fetch(api.getSContact_URL(this.id), requestOptions1))
        //let user = await res.json()
        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api.postCreateMessage(this.id + "," + this.server, this.state.msgText), requestOptions2)
        let updatedMessages = this.messages.push(
            <Message
                fromMe={true}
                type={type}
                key={this.state.msgText !== "" ? this.state.msgText : this.state.msgMulMedCont}
                mmContent={this.state.msgMulMedCont}
                txtContent={this.state.msgText}
                date={{ date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            />)
        this.updateLastMessage(
            {
                fromMe: true,
                type: type,
                content: { txt: this.state.msgText, mm: this.state.msgMulMedCont },
                date: { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            }
        )
        this.setState({
            ...this.state,
            messages: updatedMessages,
            msgText: ""
        })
        this.clearMulMedContent()
        var objDiv = window.document.getElementById("cid_chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    // componentDidUpdate=async()=>{
    //     var myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Bearer " + this.userToken);
    //         var requestOptions = {
    //             method: 'GET',
    //             headers: myHeaders,
    //             redirect: 'follow',
    //         };
    //     var res=await fetch(api.getMessagesOfContact_URL(this.id+","+this.server),requestOptions);
    //     var msgs=await res.json()
    //     this.setState({
    //         ...this.state,
    //         messages: msgs,
    //         msgText: ""
    //     })
    // }
    componentDidMount = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        var res = await fetch(api.getMessagesOfContact_URL(this.id + "," + this.server), requestOptions);
        var msgs = await res.json()
        let updtmsgs = [];
        msgs.forEach(m => {
            updtmsgs.push(<Message
                fromMe={m.toId == this.id + "," + this.server}
                type={"text"}
                key={m.MessageId}
                mmContent={""}
                txtContent={m.content}
                date={{ date: m.created, time: m.created }}
            />)
        });
        let last = {
            fromMe: false,
            type: "text",
            content: { txt: "", mm: "" },
            date: { date: "", time: "" }
        };
        if (!(updtmsgs == undefined || updtmsgs.length == 0)) {
            last = updtmsgs[updtmsgs.length - 1];
            last = last.props;
        }
        this.setState({
            ...this.state,
            messages: updtmsgs,
            msgText: ""
        })
        window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        })
        var objDiv = window.document.getElementById("cid_chat");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.messages = updtmsgs;
        this.updateLastMessage(
            {
                fromMe: last.fromMe,
                type: last.type,
                content: { txt: last.txtContent, mm: "" },
                date: { date: last.dateTime, time: last.dateTime }
            }
        )
        console.log(this.state.messages)
        console.log(msgs)

        //this.setState({messages: [...msgs] })
        
    }
    componentWillUnmount() {
        this.childComponentWillUnmount({
            msgText: this.state.msgText,
            msgMulMedPrev: this.state.msgMulMedPrev,
            messages: [...this.messages],
        });
    }
    showMultiMediaWindow = (event, type) => {
        event.preventDefault()
        this.setState({
            multiMediaType: type,
            multiMediaWindowShow: true
        })
    }
    changeMulMedContent = (content, type, comp) => {
        this.setState({
            msgMulMedCont: content,
            msgMulMedType: type,
            msgMulMedPrev: comp
        })
    }
    clearMulMedContent = (e) => {
        this.setState({
            msgMulMedPrev: "",
            msgMulMedCont: "",
            msgMulMedType: "text",
            msgMulMedPrev: ""
        })
    }
    render() {

        return (
            <div className='cid_bg' key={this.key}>
                <div id="cid_chaat_id"><h1>{this.id}</h1></div>
                <div id='cid_chat'>
                    {this.messages}
                </div>
                <Card show="true" className="collapse" id="uploadOptions">
                    <MultiMediaButton
                        key="image"
                        type="image"
                        title="Upload image"
                        icon={<i className="bi bi-file-image icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                    <MultiMediaButton
                        key="audio"
                        type="audio"
                        title="Upload audio"
                        icon={<i className="bi bi-file-music icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                    <MultiMediaButton
                        key="video"
                        type="video"
                        title="Upload video"
                        icon={<i className="bi bi-film icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                    <MultiMediaButton
                        key="imageRec"
                        type="imageRec"
                        title="Take a picture"
                        icon={<i className="bi bi-camera-fill icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                    <MultiMediaButton
                        key="audioRec"
                        type="audioRec"
                        title="Record an audio"
                        icon={<i className="bi bi-mic-fill icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                    <MultiMediaButton
                        key="videoRec"
                        type="videoRec"
                        title="Record a video"
                        icon={<i className="bi bi-camera-reels-fill icon_circle"></i>}
                        uploadMulMed={this.changeMulMedContent}
                    />
                </Card>
                <div id='cid_inputs'>
                    <Card key="mulMedContainer"
                        id="mulMedContainer"
                        hidden={this.state.msgMulMedCont == "" || this.state.msgMulMedCont == undefined ? true : false}>
                        {this.state.msgMulMedPrev}
                        <button onClick={this.clearMulMedContent}><i className="bi bi-x-lg"></i></button>
                    </Card>
                    <input autoComplete="off" autoFocus
                        id='cid_text'
                        value={this.state.msgText}
                        onChange={(e) => { this.msgTextChanged(e) }}
                    />
                    <div id='cid_buttons'>
                        <button
                            type="button"
                            className="btn btn-circle my_btn"
                            data-bs-toggle="collapse"
                            data-bs-target="#uploadOptions"
                            aria-expanded="false"
                            onClick={() => { }}
                        >
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <button className="btn btn-circle my_btn" onClick={() => this.sendMessage()}><i className="bi bi-send-fill"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatDisplay;
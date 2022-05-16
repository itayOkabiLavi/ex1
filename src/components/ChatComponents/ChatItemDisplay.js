import React, { useEffect, useState } from "react";
import { render } from 'react-dom';
import Message from "./Message";
import MultiMediaButton from "./MultiMediButton";
import './ChatItemDisplay.css'
import { Button } from "bootstrap";
import { api } from '../../api.js'
import { Form, FormGroup, Card, Modal } from "react-bootstrap";
const ChatDisplay = (props) => {
    let userId=props.userId;
    let updateLastMessage = props.updateLastMessage;
    let server = props.server;
    let userToken = props.userToken;
    let id = props.id;
    let [msgText, setMsgText] = useState("");
    let [msgMulMedCont, setMsgMulMedCont] = useState("");
    let [msgMulMedType, setMsgMulMedType] = useState("");
    let [msgMulMedPrev, setMsgMulMedPrev] = useState("");
    let [messages, setMessages] = useState([]);
    const msgTextChanged = (event) => {
        setMsgText(event.target.value);
    }
    const sendMessage = async () => {
        console.log(msgText);
        if ((msgText == "" || msgText == undefined)
            && (msgMulMedCont == "" || msgMulMedCont == undefined)) { return }
        let type = msgMulMedType != undefined ? msgMulMedType : 'text'
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        var contactId=id+","+server;
        await fetch(api.postCreateMessage(contactId, msgText), requestOptions2)
        var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        var date = new Date().toLocaleDateString("nl-NL");
        var msg = <Message
            fromMe={true}
            type={type}
            key={msgText !== "" ? msgText : msgMulMedCont}
            mmContent={msgMulMedCont}
            txtContent={msgText}
            date={{ date: date, time: time}}
        />;
        let updatedMessages = messages;
        updatedMessages.push(msg);
        setMessages([...updatedMessages]);
        updateLastMessage(
            {
                fromMe: true,
                type: type,
                content: { txt: msgText, mm: msgMulMedCont },
                date: { date:date, time:time }
            }
        )
        setMsgText("");
        clearMulMedContent()
        var objDiv = window.document.getElementById("cid_chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    useEffect(async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        var res = await fetch(api.getMessagesOfContact_URL(id + "," + server), requestOptions);
        var msgs = await res.json()
        let updtmsgs = [];
        msgs.forEach(m => {
            var date = m.created.split('T');
            var time = date[1].split('.')[0].slice(0,5);
            updtmsgs.push(<Message
                fromMe={m.toId == id + "," + server}
                type={"text"}
                key={m.MessageId}
                mmContent={""}
                txtContent={m.content}
                date={{ date: date[0], time:time}}
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
        setMessages([...updtmsgs]);
        var objDiv = window.document.getElementById("cid_chat");
        objDiv.scrollTop = objDiv.scrollHeight;
        updateLastMessage(last);
    }, [])
    const clearMulMedContent = (e) => {
        setMsgMulMedPrev("");
        setMsgMulMedCont("");
        setMsgMulMedType("text");
        setMsgMulMedPrev("");
    }
    const changeMulMedContent = (content, type, comp) => {
        setMsgMulMedCont(content);
        setMsgMulMedType(type);
        setMsgMulMedPrev(comp);
    }
    return (
        <div className='cid_bg' key={id}>
            <div id="cid_chaat_id"><h1>{id}</h1></div>
            <div id='cid_chat'>
                {messages}
            </div>
            {<Card show="true" className="collapse" id="uploadOptions">
                <MultiMediaButton
                    key="image"
                    type="image"
                    title="Upload image"
                    icon={<i className="bi bi-file-image icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
                <MultiMediaButton
                    key="audio"
                    type="audio"
                    title="Upload audio"
                    icon={<i className="bi bi-file-music icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
                <MultiMediaButton
                    key="video"
                    type="video"
                    title="Upload video"
                    icon={<i className="bi bi-film icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
                <MultiMediaButton
                    key="imageRec"
                    type="imageRec"
                    title="Take a picture"
                    icon={<i className="bi bi-camera-fill icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
                <MultiMediaButton
                    key="audioRec"
                    type="audioRec"
                    title="Record an audio"
                    icon={<i className="bi bi-mic-fill icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
                <MultiMediaButton
                    key="videoRec"
                    type="videoRec"
                    title="Record a video"
                    icon={<i className="bi bi-camera-reels-fill icon_circle"></i>}
                    uploadMulMed={changeMulMedContent}
                />
            </Card>}
            <div id='cid_inputs'>
                <Card key="mulMedContainer"
                    id="mulMedContainer"
                    hidden={msgMulMedCont == "" || msgMulMedCont == undefined ? true : false}>
                    {msgMulMedPrev}
                    <button onClick={clearMulMedContent}><i className="bi bi-x-lg"></i></button>
                </Card>
                <input autoComplete="off" autoFocus
                    id='cid_text'
                    value={msgText}
                    onChange={(e) => { msgTextChanged(e) }}
                    onKeyDown={(e) => { if (e.key == 'Enter') sendMessage() }}
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
                    <button className="btn btn-circle my_btn" onClick={() => sendMessage()}><i className="bi bi-send-fill"></i></button>
                </div>
            </div>
        </div>
    );
}


export default ChatDisplay;
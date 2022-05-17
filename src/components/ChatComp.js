import React, { useEffect, useState } from 'react';
import { api } from '../api.js'
import './ChatComp.css';
import ChatItem from './ChatComponents/ChatItem';
import ChatDisplay from './ChatComponents/ChatItemDisplay';
import Message from './ChatComponents/Message';
import users from '../database/users';
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
const ChatComp = (props) => {
    let userToken = props.userToken;
    let user = props.user;
    let setToken = props.setToken;
    let [showModal, setShowModal] = useState(false);
    let [chatExistsMsg, setChatExistsMsg] = useState(false);
    let [chats, setChats] = useState([]);
    let [currentDisplay, setCurrentDisplay] = useState(<div id='no_yet'><img src='./logo white on blue.png' /></div>);
    let [newContactName, setNewContactName] = useState('');
    let [newContactInfo, setNewContactInfo] = useState('me');
    let [newContactImg, setNewContactImg] = useState('');
    let [noChats, setNoChats] = useState(true);
    useEffect(async () => { await getContacts() }, []);
    const openNewChat = () => { setShowModal(true); }
    const closeNewChat = () => { setShowModal(false) }
    const newContactInfoChanged = async (event) => {
        if (await chatExists(newContactName, event.target.value)) {
            setChatExistsMsg(true);
        }
        else {
            setChatExistsMsg(false);
        }
        setNewContactInfo(event.target.value)
    }
    const newContactImgChanged = (event) => { setNewContactImg(event.target.value) }
    const newContactNameChanged = async (event) => {
        if (await chatExists(event.target.value, newContactInfo)) {
            setChatExistsMsg(true);
        }
        else {
            setChatExistsMsg(false);
        }
        setNewContactName(event.target.value);
    }
    const chatExists = async (name, server) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var res = await fetch(api.getSContact_URL(name + "," + server), requestOptions);
        res = await res.json();
        return res !== null;
    }
    const addNewChat = async () => {
        if (await chatExists(newContactName, newContactInfo)) { setChatExistsMsg(true) }
        else {
            var payLoad = { id: newContactName, name: newContactName, server: newContactInfo }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + userToken);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
            };
            var res = await fetch(api.postContacts_URL(payLoad), requestOptions);
            if (res.status != 200) { return; }
            setChatExistsMsg(false);
            let updatedChats = chats;
            updatedChats.unshift(
                <ChatItem
                    userId={user.userId}
                    server={newContactInfo}
                    userToken={userToken}
                    key={newContactName}
                    name={newContactName}
                    contact_info={newContactInfo}
                    img={newContactImg}
                    lastMessage={{
                        fromMe: false,
                        type: "text",
                        content: { txt: "", mm: "" },
                        date: { time: "", date: "" }
                    }}
                    callBack={(childsDisplay) => { setCurrentDisplay(childsDisplay); }}
                />
            )
            setChats(updatedChats);
            setNoChats(false);
            setShowModal(false);
            setNewContactImg('https://cdn-icons-png.flaticon.com/512/720/720236.png');
            setNewContactInfo('');
        }
    }
    const getContacts = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(api.getContacts_URL(), requestOptions);
        const rawChats = await response.json();
        let tempChats = []
        rawChats.forEach(chat => {
            var date = chat.lastDate.split('T');
            tempChats.push(
                <ChatItem
                    userId={user.userId}
                    server={chat.server}
                    userToken={userToken}
                    key={chat.userId}
                    name={chat.fullName}
                    contact_info={chat.nickName}
                    img={chat.img}
                    lastMessage={{
                        fromMe: false,
                        type: "text",
                        content: { txt: chat.last, mm: " " },
                        date: { date: date[0], time: date[1].slice(0,5) }
                    }}
                    callBack={(childsDisplay) => { setCurrentDisplay(childsDisplay); }}
                />
            )
        });
        
        setChats([...tempChats]);
    }
    return (
        <div id='chat_bg'>
            <div id='chatCompMain'>
                <div id='chatsTools'>
                    <div id='userInfo'>
                        <img src={user.img} />
                        <span id='nickName'>{user.nickName}</span>
                    </div>
                    <Button
                        id="addChat"
                        onClick={() => { openNewChat() }}
                        title="Add new chat">
                        <i className="bi bi-person-plus-fill"></i>
                    </Button>
                    <Button
                        onClick={() => setToken({ authed: false })}
                        title="Logout">
                        <i className="bi bi-box-arrow-right"></i>
                    </Button>
                    <Modal className='myModal' show={showModal}>
                        <div id="addChatModal">
                            <Modal.Header className='modalHeader'><h1>Add new contact</h1></Modal.Header>
                            <Modal.Body className='modalBody'>
                                <label htmlFor='cName'>Enter new contact name
                                    <input autoFocus id='cName'
                                        onChange={(e) => { newContactNameChanged(e) }}
                                    />
                                </label>
                                <label htmlFor='cServer'>Enter new contact server
                                    <input id='cServer'
                                        defaultValue={"me"}
                                        onChange={(e) => { newContactInfoChanged(e) }}
                                    />
                                </label>
                                <label hidden={!chatExistsMsg}>
                                    contact already exists
                                </label>
                            </Modal.Body>
                            <Modal.Footer className='modalFooter'>
                                <Button className='modalFooterButton' onClick={() => { closeNewChat() }}>
                                    <i className="bi bi-trash3"></i>
                                </Button>
                                <Button className='modalFooterButton' onClick={() => { addNewChat() }}>
                                    <i className="bi bi-plus-lg"></i>
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
                </div>
                <div id='mainlist'>
                    {chats}
                </div>
                <div id="chatdisplay">
                    {currentDisplay}
                </div>
            </div>
        </div>
    );

}


export default ChatComp
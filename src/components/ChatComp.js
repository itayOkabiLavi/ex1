import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api.js'
import './ChatComp.css';
import ChatItem from './ChatComponents/ChatItem';
import { ChatDisplay } from './ChatComponents/ChatItemDisplay';
import Message from './ChatComponents/Message';
import users from '../database/users';
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import ReactDOM from "react-dom";

const ChatComp = (props) => {
    const [connection, setConnection] = useState(null);
    let userToken=props.userToken;
    let setToken = props.setToken;
    const user=useRef(null);
    let [showModal, setShowModal] = useState(false);
    let [chatExistsMsg, setChatExistsMsg] = useState(false);
    let [chats, setChats] = useState([]);
    let [currentDisplay, setCurrentDisplay] = useState(<div id='no_yet'><img src='./logo white on blue.png' /></div>);
    let [newContactName, setNewContactName] = useState('');
    let [newContactInfo, setNewContactInfo] = useState('me');
    let [newContactImg, setNewContactImg] = useState('');
    let [loading,setLoading]=useState(true);

    useEffect(async () => {
        setLoading(true);
        console.log("use")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        let response = await fetch(api.getUser(), requestOptions);
        if (response.status != 200) {
            user.current=undefined;
        }
        else {
            let res = await response.json();
            user.current=res;
        }
        setLoading(false);
        await getContacts();
    },[]);

    useEffect(() => {
        // Connect, using the token we got.
        const newConnection = new HubConnectionBuilder()
            .withUrl(api.hub(), {
                accessTokenFactory: () => userToken,
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);
    useEffect(() => {
        if (connection) {
            connection.start();
            connection.on('ReceiveMessage', async (f, t, m) => {
                await getContacts();
            });
        }
    }, [connection]);
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
        res = await res.text();
        return res !== "";
    }
    const addNewChat = async () => {
        if (await chatExists(newContactName, newContactInfo)) { setChatExistsMsg(true) }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + userToken);
            var formdata = new FormData();
            formdata.append("id", newContactName);
            formdata.append("name", newContactName);
            formdata.append("server", newContactInfo)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            };
            var res = await fetch(api.postContacts_URL(), requestOptions);
            if (res.status != 201) { return; }
            requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            var res = await fetch(api.getSContact_URL(newContactName + "," + newContactInfo), requestOptions);
            res = await res.json();
            setChatExistsMsg(false);
            let updatedChats = chats;
            let img = res.profileImg != null ? 'data:image/jpeg;base64,' + res.profileImg.data : ('https://cdn-icons-png.flaticon.com/512/720/720236.png');
            updatedChats.unshift(
                <ChatItem
                    userId={user.current.userId}
                    server={newContactInfo}
                    userToken={userToken}
                    key={newContactName}
                    name={newContactName}
                    contact_info={newContactInfo}
                    img={img}
                    lastMessage={{
                        fromMe: false,
                        type: "text",
                        content: { txt: "", mm: "" },
                        date: { time: "", date: "" }
                    }}
                    callBack={setCurrentDisplay}

                //callBack={(childsDisplay) => { setCurrentDisplay(childsDisplay); }}
                />
            )
            setChats(updatedChats);
            setShowModal(false);
            setNewContactImg('https://cdn-icons-png.flaticon.com/512/720/720236.png');
            setNewContactInfo('');
        }
    }
    const getContacts = async () => {
        console.log("here")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(api.getContacts_URL(), requestOptions);
        const rawChats = await response.json();
        rawChats.forEach(c => console.log(c.last));
        let tempChats = []
        rawChats.forEach(chat => {
            var date = chat.lastDate.split('T');
            let img = (chat.profileImg != null && chat.profileImg != undefined) ? 'data:image/jpeg;base64,' + chat.profileImg.data : ('https://cdn-icons-png.flaticon.com/512/720/720236.png');
            //console.log(chat.userId);
            tempChats.push(
                <ChatItem
                    userId={user.current.userId}
                    server={chat.server}
                    userToken={userToken}
                    key={chat.id + ((new Date().getTime()) / 1000)}
                    name={chat.id}
                    contact_info={chat.nickName}
                    img={img}
                    lastMessage={{
                        fromMe: false,
                        type: chat.lastType,
                        content: { txt: chat.last, mm: " " },
                        date: { date: date[0], time: date[1].slice(0, 5) }
                    }}
                    callBack={setCurrentDisplay}
                //callBack={(childsDisplay) => { setCurrentDisplay(childsDisplay); }}
                />
            )
        });
        setChats([...tempChats]);
        console.log(chats);

    }
    return user.current != null && !loading &&(
        <div id='chat_bg'>
            <div id='chatCompMain'>
                <div id='chatsTools'>
                    <div id='userInfo'>
                        <img src={'data:image/jpeg;base64,' + user.current.profileImg.data} />
                        <span id='nickName'>{user.current.name}</span>
                    </div>
                    <Button
                        id="addChat"
                        onClick={() => { openNewChat() }}
                        title="Add new chat">
                        <i className="bi bi-person-plus-fill"></i>
                    </Button>
                    <Button
                        onClick={() => setToken("")}
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
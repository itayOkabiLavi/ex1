import React, { useEffect, useState } from 'react';
import { api } from '../api.js'
import './ChatComp.css';
import ChatItem1 from './ChatComponents/ChatItem';
import ChatDisplay from './ChatComponents/ChatItemDisplay';
import Message from './ChatComponents/Message';
import users from '../database/users';
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
const ChatComp1 = (props) => {
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
            <ChatItem1
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
                    content: { txt: " ", mm: " " },
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
            <ChatItem1
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
                    date: { time: date[0], date: date[1].split('.')[0] }
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

class ChatComp extends React.Component {

    constructor(prop) {
        super(prop)
        this.userToken = this.props.userToken;
        this.user = this.props.user;
        this.i = 1
        this.rawChats = [];
        //this.chats = this.getContacts();

        this.setToken = this.props.setToken

        this.state = {
            rawChats: [],
            chats: [],
            showModal: false,
            newContactName: '',
            newContactInfo: 'me',
            newContactImg: 'https://cdn-icons-png.flaticon.com/512/720/720236.png',
            newContactNote: '',
            currentDisplay: <div id='no_yet'><img src='./logo white on blue.png' /></div>,
            noChats: true,
            chatExistsMsg: false
        };

    }
    componentDidMount() {
        //this.user=this.getContacts();
        //this.chats=this.getContacts();
        console.log("componentDidMount");
        //this.getContacts();
        //this.setState({ rawChats: this.getContacts()});
        //console.log("rawChats", this.rawChats);
        this.getContacts().then((raw) => { this.parseAllChatItems(raw) });
        //let c = this.parseAllChatItems();
        //console.log("before setstate", c);
        //this.setState({ chats: c });
    }
    componentDidUpdate() {
        //this.user=this.getUser();
        //this.chats=this.getContacts();
        //console.log("componentDidUpdate");

        //this.setState({ chats: this.parseAllChatItems()});
    }
    getContacts = async () => {
        console.log("token----------", this.userToken)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.userToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        //const mainThis = this;
        const response = await fetch(api.getContacts_URL(), requestOptions);
        const r = await response.json();
        return r;
        //this.chats = mainThis.chats;
    }
    getSrcType = (type, fileName) => {
        const mulmedType = /(?:\.([^.]+))?$/;
        return type + "/" + mulmedType.exec(fileName)[1]
    }
    parseMessages = (msgsArray) => {
        let msgsObjArray = []
        msgsArray.forEach(msg => {
            msgsObjArray.push(
                <Message
                    fromMe={msg.fromMe}
                    type={msg.type}
                    mmContent={msg.content.mm}
                    txtContent={msg.content.txt}
                    date={msg.date}
                    key={msg.content.txt != "" ? msg.content.txt : msg.content.mm}
                />
            )
        })
        return msgsObjArray
    };
    parseAllChatItems(rawChats) {
        console.log("parseAllChatItems");
        let tempChats = []
        console.log("chatssssss", rawChats);
        rawChats.forEach(chat => {
            console.log("chat", chat);
            tempChats.push(
                <ChatItem1
                    server={chat.server}
                    userToken={this.userToken}
                    key={chat.userId}
                    name={chat.fullName}
                    contact_info={chat.nickName}
                    img={chat.img}
                    lastMessage={{
                        fromMe: false,
                        type: "text",
                        content: { txt: chat.last, mm: " " },
                        date: { time: chat.lastDate, date: chat.lastDate }
                    }}
                    messages={this.parseMessages(chat.userMessages)}
                    callBack={(childsDisplay) => { this.setState({ currentDisplay: childsDisplay }) }}
                />
            )
        });
        this.setState({ chats: [...tempChats] });
        return tempChats
    }
    openNewChat() { this.setState({ showModal: true }) }
    closeNewChat() { this.setState({ showModal: false }) }
    newContactNameChanged(event) {
        if (this.chatExists(event.target.value)) {
            this.setState({ chatExistsMsg: true })
        }
        else {
            this.setState({ chatExistsMsg: false })
        }
        this.setState({ newContactName: event.target.value });
    }
    newContactInfoChanged(event) { this.setState({ newContactInfo: event.target.value }) }
    newContactImgChanged(event) { this.setState({ newContactImg: event.target.value }) }
    chatExists(name) {
        return this.state.chats.findIndex((x) => { return x.key == name; }) != -1;
    }
    async addNewChat() {
        if (this.chatExists(this.state.newContactName)) { this.setState({ chatExistsMsg: true }) }
        else {
            var body = { id: this.state.newContactName, name: this.state.newContactName, server: this.state.newContactInfo }
            //var bodyStr=JSON.stringify(body);
            //bodyStr="id="+this.state.newContactName+"&name="+this.state.newContactName+"&server="+this.state.newContactInfo
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + this.userToken);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                //body:bodyStr,
            };
            await fetch(api.postContacts_URL(body), requestOptions);
            //const r = await response.json();
            this.setState({ chatExistsMsg: false })
            let updatedChats = this.state.chats
            updatedChats.unshift(
                <ChatItem1
                    server={body.server}

                    userToken={this.userToken}
                    key={this.state.newContactName}
                    name={this.state.newContactName}
                    contact_info={this.state.newContactInfo}
                    img={this.state.newContactImg}
                    messages={[]}
                    lastMessage={{
                        fromMe: false,
                        type: "text",
                        content: { txt: " ", mm: " " },
                        date: { time: "", date: "" }
                    }}
                    callBack={(childsDisplay) => { this.setState({ currentDisplay: childsDisplay }) }}
                />
            )
            this.setState({
                chats: updatedChats,
                noChats: false,
                showModal: false,
                newContactName: '',
                newContactInfo: '',
                newContactImg: 'https://cdn-icons-png.flaticon.com/512/720/720236.png',
                newContactNote: ''
            })
        }
    }
    childComponentWillUnmount = ({ id, data }) => {
        this.chatsDict = { ...this.chatsDict, [id]: data };
    }
    render() {
        return (
            <div id='chat_bg'>
                <div id='chatCompMain'>
                    <div id='chatsTools'>
                        <div id='userInfo'>
                            <img src={this.user.img} />
                            <span id='nickName'>{this.user.nickName}</span>
                        </div>
                        <Button
                            id="addChat"
                            onClick={() => { this.openNewChat() }}
                            title="Add new chat">
                            <i className="bi bi-person-plus-fill"></i>
                        </Button>
                        <Button
                            onClick={() => this.setToken({ authed: false })}
                            title="Logout">
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                        <Modal className='myModal' show={this.state.showModal}>
                            <div id="addChatModal">
                                <Modal.Header className='modalHeader'><h1>Add new contact</h1></Modal.Header>
                                <Modal.Body className='modalBody'>
                                    <label htmlFor='cName'>Enter new contact name
                                        <input autoFocus id='cName'
                                            onChange={(e) => { this.newContactNameChanged(e) }}
                                        />
                                    </label>
                                    <label htmlFor='cServer'>Enter new contact server
                                        <input id='cServer'
                                            defaultValue={"me"}
                                            onChange={(e) => { this.newContactInfoChanged(e) }}
                                        />
                                    </label>
                                    <label hidden={!this.state.chatExistsMsg}>
                                        contact already exists
                                    </label>
                                </Modal.Body>
                                <Modal.Footer className='modalFooter'>
                                    <Button className='modalFooterButton' onClick={() => { this.closeNewChat() }}>
                                        <i className="bi bi-trash3"></i>
                                    </Button>
                                    <Button className='modalFooterButton' onClick={() => { this.addNewChat() }}>
                                        <i className="bi bi-plus-lg"></i>
                                    </Button>
                                </Modal.Footer>
                            </div>
                        </Modal>
                    </div>
                    <div id='mainlist'>
                        {this.state.chats}
                    </div>
                    <div id="chatdisplay">
                        {this.state.currentDisplay}
                    </div>
                </div>
            </div>
        );
    }

}

export default ChatComp1
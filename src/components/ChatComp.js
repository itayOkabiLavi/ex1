import React from 'react';
import { api } from '../api.js'
import './ChatComp.css';
import ChatItem from './ChatComponents/ChatItem';
import ChatDisplay from './ChatComponents/ChatItemDisplay';
import Message from './ChatComponents/Message';
import users from '../database/users';
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";


class ChatComp extends React.Component {

    constructor(prop) {
        super(prop)
        this.i = 1
        this.chats = []
        this.userToken = this.props.userToken
        this.user = this.getUser(this.props.URLport)

        this.setToken = this.props.setToken

        this.state = {
            chats: this.parseAllChatItems(),
            showModal: false,
            newContactName: '',
            newContactInfo: '',
            newContactImg: 'https://cdn-icons-png.flaticon.com/512/720/720236.png',
            newContactNote: '',
            currentDisplay: <div id='no_yet'><img src='./logo white on blue.png' /></div>,
            noChats: true,
            chatExistsMsg: false
        };
    }
    getUser = () => {
        fetch( api.getContacts(),
         {method: 'POST', body: this.userToken.token} 
        ).then(
            function(response) {
                console.log(response.status)
                if (response.status != 200) {
                    console.log('error loadin contacts');
                } else {
                    response.text().then((text) => {
                        return JSON.parse(text, (key, value) => value);
                    })
                }
            }
        )
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
    parseAllChatItems() {
        let tempChats = []

        this.user.chats.forEach(chat => {
            tempChats.push(
                <ChatItem
                    key={chat.addressee}
                    name={chat.addressee}
                    contact_info={chat.contactInfo}
                    img={chat.img}
                    lastMessage={chat.messages[chat.messages.length - 1]}
                    messages={this.parseMessages(chat.messages)}
                    callBack={(childsDisplay) => { this.setState({ currentDisplay: childsDisplay }) }}
                />
            )
        });
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
    addNewChat() {
        if (this.chatExists(this.state.newContactName)) { this.setState({ chatExistsMsg: true }) }
        else {
            this.setState({ chatExistsMsg: false })
            let updatedChats = this.state.chats
            updatedChats.unshift(
                <ChatItem
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

export default ChatComp
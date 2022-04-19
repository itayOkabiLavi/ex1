import React from 'react';

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
        this.user=this.props.user
        this.setToken = this.props.setToken
        
        this.state = {
            chats: this.parseAllChatItems(),
            showModal: false,
            newContactName: 'new',
            newContactInfo: 'mail',
            newContactImg: 'https://cdn-icons-png.flaticon.com/512/720/720236.png',
            newContactNote: '',
            currentDisplay: <div id='no_yet'><img src='./logo white on blue.png'/></div>,
            noChats: true
        };
    }
    getSrcType = (type, fileName) => {
        const mulmedType = /(?:\.([^.]+))?$/;
        return type + "/" + mulmedType.exec(fileName)[1]
    }
    parseMessages = (msgsArray) => {
        let msgsObjArray = []
        msgsArray.forEach(msg => {msgsObjArray.push(
                <Message
                    fromMe={msg.fromMe}
                    type={msg.type}
                    mmContent={msg.content.mm}
                    txtContent={msg.content.txt}
                    date={ msg.date}
                />   
            )
        })
        return msgsObjArray
    };
    parseAllChatItems () {
        let tempChats = []
        
        this.user.chats.forEach(chat => {
            tempChats.push(<ChatItem
                        key={chat.addressee}
                        name={chat.addressee}
                        is_mail={true}
                        contact_info={chat.contactInfo}
                        img={chat.img}
                        lastMessage={chat.messages[chat.messages.length - 1]}
                        messages={this.parseMessages(chat.messages)}
                        callBack={(childsDisplay, id) => {this.setState({currentDisplay: childsDisplay})}}
                    />
            )
        });
        console.log("chatItems: ", tempChats)
        return tempChats
    }
    openNewChat() { this.setState({ showModal: true }) }
    closeNewChat() { this.setState({ showModal: false }) }
    newContactNameChanged(event) { this.setState({ newContactName: event.target.value }) }
    newContactInfoChanged(event) { this.setState({ newContactInfo: event.target.value }) }
    newContactImgChanged(event) { this.setState({ newContactImg: event.target.value }) }
    chatExists() { return false }
    addNewChat() {
        if (this.chatExists()) { }
        else {
            let updatedChats = this.state.chats
            updatedChats.push(
                <ChatItem
                    key={this.state.newContactName}
                    name={this.state.newContactName}
                    is_mail={true}
                    contact_info={this.state.newContactInfo}
                    img={this.state.newContactImg}
                    messages={[]}
                    lastMessage={{  fromMe: false, 
                                    type:"text", 
                                    content: { txt: " ", mm: " " },
                                    date: {time: "", date: ""}}}
                    callBack={(childsDisplay, id) => {this.setState({currentDisplay: childsDisplay})}}
                />
            )
            this.setState({
                chats: updatedChats,
                noChats: false,
                showModal: false,
                newContactName: 'new' + Math.floor(Math.random() * 100),
                newContactInfo: 'mail',
                newContactImg: 'https://cdn-icons-png.flaticon.com/512/720/720236.png',
                newContactNote: ''
            })
        }
    }
    childComponentWillUnmount = ({ id, data }) => {
        this.chatsDict = { ...this.chatsDict, [id]: data };
        console.log(this.chatsDict)
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
                            onClick={()=>this.setToken({authed:false})}
                            title="Logout">
                            <i class="bi bi-box-arrow-right"></i>
                        </Button>
                        <Modal className='myModal' show={this.state.showModal}>
                            <div id="addChatModal">
                            <Modal.Header className='modalHeader'><h1>Add new contact</h1></Modal.Header>
                            <Modal.Body className='modalBody'>
                                <label htmlFor='cName'>Enter new contact name
                                <input autoFocus id='cName'
                                    defaultValue={this.state.newContactName}
                                    onChange={(e) => { this.newContactNameChanged(e) }}
                                /></label>
                                <label htmlFor='cContactInfo'>Enter new contact's mail
                                <input autocomplete="off" id='cContactInfo'
                                    type="email"
                                    defaultValue={this.state.newContactInfo}
                                    onChange={(e) => { this.newContactInfoChanged(e) }}
                                /></label>
                                <label htmlFor='cContactImg'>Enter new contact's image url
                                <input id='cContactImg'
                                    type="text"
                                    defaultValue={this.state.newContactImg}
                                    onChange={(e) => { this.newContactImgChanged(e) }}
                                /></label>
                            </Modal.Body>
                            <Modal.Footer className='modalFooter'>
                                <Button className='modalFooterButton' onClick={() => { this.closeNewChat() }}>
                                    <i class="bi bi-trash3"></i>
                                </Button>
                                <Button className='modalFooterButton' onClick={() => { this.addNewChat() }}>
                                    <i class="bi bi-plus-lg"></i>
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
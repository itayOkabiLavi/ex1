import React from 'react';

import './ChatComp.css';
import ChatItem from './ChatComponents/ChatItem';
import ChatDisplay from './ChatComponents/ChatItemDisplay';
import Message from './ChatComponents/Message';
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
            chats: [],
            showModal: false,
            newContactName: 'new',
            newContactInfo: 'mail',
            newContactImg: 'https://i.pinimg.com/originals/57/79/4b/57794be8a33303e29861e3f6c7db7587.jpg',
            newContactNote: '',
            currentDisplay: "",
            noChats: true
        };
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
            let updatedChats = this.chats.push(
                <ChatItem
                    key={this.state.newContactName}
                    name={this.state.newContactName}
                    is_mail={true}
                    contact_info={this.state.newContactInfo}
                    img={this.state.newContactImg}
                    callBack={(childsDisplay, id) => {
                        let newState = {
                            currentDisplay: childsDisplay
                        }
                        this.setState(newState);
                    }
                    }
                />
            )
            this.setState({
                chats: updatedChats,
                noChats: false,
                showModal: false,
                newContactName: 'new' + Math.floor(Math.random() * 100),
                newContactInfo: 'mail',
                newContactImg: 'https://i.pinimg.com/originals/57/79/4b/57794be8a33303e29861e3f6c7db7587.jpg',
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
                                <input id='cName'
                                    defaultValue={this.state.newContactName}
                                    onChange={(e) => { this.newContactNameChanged(e) }}
                                /></label>
                                <label htmlFor='cContactInfo'>Enter new contact's mail
                                <input id='cContactInfo'
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
                        {this.chats}
                    </div>
                    <div id="chatdisplay">
                    {this.state.noChats ? <div id='no_yet'><img src='./logo white on blue.png'/></div> : this.state.currentDisplay}
                    </div>
                </div>
            </div>
        );
    }

}

export default ChatComp
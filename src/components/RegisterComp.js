import React from "react";
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import './RegisterComp.css'

class RegisterComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameTaken: false,
            pwdsNotMatch: false,
            profileImageSrc: ''
        }
        this.currentUsers= props.importedUsers
        this.cancel = props.showLogin
        this.addUser = props.addUser
    }
    verifyReg(event) {
        event.preventDefault();
        if (this.currentUsers.findIndex((x) => { return x.userName === event.target.name.value; }) !== -1) {
            this.setState({nameTaken: true})
            console.log("already exists");
        } else {
            console.log("ok!");
            this.addUser(
                {name:  event.target.name.value,
                password:   event.target.password.value,
                isMail:     true,
                contact:    event.target.contact.value,
                img:        event.target.image.value}
            )
            this.setState({
                nameTaken: false,
                profileImageSrc: event.target.image.value,
            })
            this.cancel()
        }
    }
    render() {return (
        <div className="log_reg_window">
            <h1>Register</h1>
            <form onSubmit={(e)=>(this.verifyReg(e))}>
                <label className="" htmlFor='new_user_name'>Name
                <input id='new_user_name' name="name"/></label>
                {this.state.nameTaken ? <small>name is taken</small> : <small></small>}
                <label htmlFor='new_user_email'>Email
                <input id='new_user_email' name="contact"/></label>

                <label htmlFor='new_user_pwd'>Enter Password
                <input type='password' id='new_user_pwd' name="password"/></label>

                <label htmlFor='new_user_img'>Upload image
                <input type='file' id='new_user_img' name="image"/></label>
                <img src={this.state.profileImageSrc}/>
                <div className="ending_buttons">
                    <Button id='cancel_reg' onClick={(e)=>{this.cancel()}}>cancel</Button>
                    <Button type='submit' id='apply_reg' onSubmit={(e)=>(this.verifyReg(e))}>apply</Button>
                </div>
            </form>
        </div>
    )}
}

export default RegisterComp
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
    verifyReg(submitting) {
        if (this.currentUsersfindIndex((x) => { return x.userName === submitting.name; }) !== -1) {
            this.setState({nameTaken: true})
        } else {
            this.setState({
                nameTaken: false,

            })
            /*
            this.addUser(
                {userName:   submitting.name,
                password:   submitting.password,
                isMail:     true,
                contact:    submitting.contact,
                img:        submitting.img}
            )*/
        }
    }
    render() {return (
        <div className="log_reg_window">
            <h1>Register</h1>
            <form onSubmit={this.verifyReg}>
                <label className="" htmlFor='new_user_name'>Name
                <input id='new_user_name' name="name"/></label>

                <label htmlFor='new_user_email'>Email
                <input id='new_user_email' name="contact"/></label>

                <label htmlFor='new_user_pwd'>Enter Password
                <input type='password' id='new_user_pwd' name="password"/></label>

                <label htmlFor='new_user_pwd'>Upload image
                <input type='file' id='new_user_img' name="password"/></label>

                <div className="ending_buttons">
                    <Button id='cancel_reg' onClick={(e)=>{this.cancel()}}>cancel</Button>
                    <Button type='submit' id='apply_reg' onSubmit={this.verifyReg}>register</Button>
                </div>
            </form>
        </div>
    )}
}

export default RegisterComp
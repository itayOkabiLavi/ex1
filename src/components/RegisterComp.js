import React from "react";
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import './RegisterComp.css'

class RegisterComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            regErrors: "",
            pwdType: 'password',
            pwdIcon: <i class="bi bi-eye-slash"></i>,
            pwdsNotMatch: false,
            profileImageSrc: 'https://i.pinimg.com/originals/57/79/4b/57794be8a33303e29861e3f6c7db7587.jpg'
        }
        this.currentUsers= props.importedUsers
        this.cancel = props.showLogin
        this.addUser = props.addUser
    }
    fieldsOk(fields) {
        let notes = ""
        if (this.currentUsers.findIndex((x) => { return x.userName === fields.name.value; }) !== -1)
            notes += "User name is taken.\n"
        if (fields.name.value == "") notes += "Enter user name. "
        const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~])[A-Za-z0-9!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~]{5,}/
        if (!reg.test(fields.password.value)) 
            notes += "Password must have 5+ characters, at least 1 Uppercase, 1 lower, 1 number and 1 special. "
        else if (fields.password.value !== fields.passwordVer.value) notes += "Passwords don't match. "
        if (fields.contact.value == "") notes += "Enter contact info."
        this.setState({ regErrors: notes })
        return notes == ""
    }
    verifyReg(event) {
        event.preventDefault();
        if (this.fieldsOk(event.target)) {
            this.addUser({
                name:  event.target.name.value,
                password:   event.target.password.value,
                isMail:     true,
                contact:    event.target.contact.value,
                img:        this.state.profileImageSrc
            })
            this.setState({
                nameTaken: false
            })
            this.cancel()
        }
        
    }
    imageUploader = (event) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) this.setState({ profileImageSrc: fileReader.result})
        }
        fileReader.readAsDataURL(event.target.files[0])
        console.log("prof pic details: \n", fileReader);
    }
    render() {return (
        <div className="log_reg_window">
            <h1>Register</h1>
            <label htmlFor='new_user_img' id="profPicLabel">
                <i id="new_user_img_btn" class="bi bi-arrow-down-circle-fill"></i>
                <input type='file' id='new_user_img' name="image" onChange={this.imageUploader}/></label>
                <img src={this.state.profileImageSrc} id="profPic"/>
            <form onSubmit={(e)=>(this.verifyReg(e))}>
                <label className="" htmlFor='new_user_name'>
                <input 
                    id='new_user_name' 
                    placeholder="User name"
                    name="name"/></label>

                <label htmlFor='new_user_contactInfo'>
                <input 
                    id='new_user_contactInfo'
                    placeholder="Phone number"
                    name="contact"/></label>

                <label htmlFor='new_user_pwd' id="pwdLabel">
                <input 
                    type={this.state.pwdType}
                    id='new_user_pwd' 
                    placeholder="Enter password"
                    name="password"/>
                <input 
                    type={this.state.pwdType}
                    id='new_user_pwd_ver' 
                    placeholder="Reenter password"
                    name="passwordVer"
                    />
                <button id="pwdBtn" onClick={(e)=>{
                    if (this.state.pwdType == 'password') {this.setState({
                        pwdType: 'text',
                        pwdIcon: <i class="bi bi-eye-slash"></i>
                    })}
                    else {this.setState({
                        pwdType: 'password',
                        pwdIcon: <i class="bi bi-eye"></i>
                    })}
                }}>{this.state.pwdIcon}</button>
                </label>
                <small id="regErrors">{this.state.regErrors}</small>
                <div className="ending_buttons">
                    <Button id='cancel_reg' onClick={(e)=>{this.cancel()}}>cancel</Button>
                    <Button type='submit' id='apply_reg' onSubmit={(e)=>(this.verifyReg(e))}>apply</Button>
                </div>
            </form>
        </div>
    )}
}

export default RegisterComp
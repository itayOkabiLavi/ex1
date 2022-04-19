import React from "react";
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import './RegisterComp.css'

class RegisterComp extends React.Component {
    constructor(props) {
        super(props)
        this.defaultRegisterNote = "Enter your details. Error notes will appear here. Default password is Aa1!a "
        this.state = {
            regErrors: "",
            pwdType: 'password',
            pwdIcon: <i class="bi bi-eye-slash"></i>,
            pwdsNotMatch: false,
            profileImageSrc: 'https://cdn-icons-png.flaticon.com/512/720/720236.png'
        }
        this.currentUsers = props.importedUsers
        this.cancel = props.showLogin
        this.setToken = props.setToken
        this.addUser = props.addUser
        this.setNotes = props.setNotes
        this.setNotes(this.defaultRegisterNote)
    }
    fieldsOk(fields) {
        let notes = ""
        if (this.currentUsers.findIndex((x) => { return x.userName === fields.name.value; }) !== -1)
            notes += "User name is taken.\n"
        if (fields.name.value == "") notes += "Enter user name. "
        if (fields.nickname.value.length == 0 || fields.nickname.value.length > 7) {
            notes += "NickName should be non empty and 7 characters at most. "
        }
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}/
        //const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~])[A-Za-z0-9!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~]{5,}/
        if (!reg.test(fields.password.value))
            notes += "Password must have 5+ characters, at least 1 letter and 1 number. "
        // notes += "Password must have 5+ characters, at least 1 Uppercase, 1 lower, 1 number and 1 special. "
        else if (fields.password.value !== fields.passwordVer.value) notes += "Passwords don't match. "
        if (fields.contact.value == "") notes += "Enter contact info."
        //this.setState({ regErrors: notes })
        this.setNotes(notes)
        return notes === ""
    }
    verifyReg(event) {
        event.preventDefault();
        if (this.fieldsOk(event.target)) {
            let newUser = {
                userName: event.target.name.value,
                nickName: event.target.nickname.value,
                password: event.target.password.value,
                isMail: true,
                contactInfo: event.target.contact.value,
                img: this.state.profileImageSrc,
                chats: []
            }
            this.addUser(newUser)
            this.setState({
                nameTaken: false
            })
            this.setToken({ authed: true, user: newUser });
        }

    }
    imageUploader = (event) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) this.setState({ profileImageSrc: fileReader.result })
        }
        fileReader.readAsDataURL(event.target.files[0])
        console.log("prof pic details: \n", fileReader);
    }
    submit = (e) => {
        e.preventDefault()
        console.log("applying");
        this.verifyReg(e)
    }
    render() {
        return (
            <div className="right_side">
                <h1>Register</h1>

                <label htmlFor='new_user_img_input' id="profPicLabel">

                    <img src={this.state.profileImageSrc} id="profPic" />
                    <input type='file' id='new_user_img_input' name="image" onChange={this.imageUploader} />
                    <h4>Upload your profile picture here. Square ones recommended.</h4>
                </label>

                <form autoComplete="off" onSubmit={(e) => (this.verifyReg(e))}>
                    <label className="two-in-line" id="namesLabel">
                        <input autoFocus
                            id='new_user_name'
                            placeholder="User name"
                            name="name" />
                        <input id='new_user_nickname'
                            placeholder="Nickname"
                            name="nickname" />
                    </label>
                    <input
                        id='new_user_contactInfo'
                        placeholder="Phone number"
                        name="contact" />

                    <label htmlFor='new_user_pwd' className="two-in-line" id="pwdLabel">
                        <input
                            type={this.state.pwdType}
                            id='new_user_pwd'
                            placeholder="Enter password"
                            name="password"
                            defaultValue="Aa1!a"
                        />
                        <input
                            type={this.state.pwdType}
                            id='new_user_pwd_ver'
                            placeholder="Reenter password"
                            name="passwordVer"
                            defaultValue="Aa1!a"
                        />
                    </label>
                    <div className="ending_buttons">
                        <button type="submit" id='apply_reg' onSubmit={this.submit}
                            style={{ color: "aliceblue", backgroundColor: "rgb(240, 0, 104)" }}>Apply</button>
                        <button type="button" id='cancel_reg' onClick={(e) => { this.cancel() }}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterComp
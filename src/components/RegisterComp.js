import React from "react";
import { Button, Form, Modal, Nav, TabContent } from 'react-bootstrap';
import './RegisterComp.css'
import { api } from '../api.js'
class RegisterComp extends React.Component {
    constructor(props) {
        super(props)
        this.defaultRegisterNote = "Enter your details. Error notes will appear here."
        this.state = {
            regErrors: "",
            pwdType: 'password',
            pwdIcon: <i className="bi bi-eye-slash"></i>,
            pwdsNotMatch: false,
            profileImageSrc: ""
            //profileImageSrc: 'https://cdn-icons-png.flaticon.com/512/720/720236.png'
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
        if (fields.name.value == "") notes += "Enter user name. "
        if (fields.nickname.value.length == 0 || fields.nickname.value.length > 7) {
            notes += "NickName should be non empty and 7 characters at most. "
        }
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}/
        if (!reg.test(fields.password.value))
            notes += "Password must have 5+ characters, at least 1 letter and 1 number. "
        else if (fields.password.value !== fields.passwordVer.value) notes += "Passwords don't match. "
        const registrationDetails = {
            name: fields.name.value,
            nickname: fields.nickname.value,
            password: fields.password.value,
            profileImage: this.state.profileImageSrc
        }
        const mainThis = this
        var formdata = new FormData();
        formdata.append("name", fields.name.value);
        formdata.append("password", fields.password.value);
        formdata.append("nickname", fields.nickname.value);
        formdata.append("profileImage", this.state.profileImageSrc);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch(api.getRegister_URL(), requestOptions).then(function (response) {
            console.log(response.status)
            if (response.status != 200) {
                console.log('register denied');
                notes += "User name is taken.\n"
            } else {
                console.log('register approved');
            }
            mainThis.setNotes(notes)
            return notes === ""
        }
        )
        /*
        if (this.currentUsers.findIndex((x) => { return x.userName === fields.name.value; }) !== -1)
        */

    }
    verifyReg(event) {
        event.preventDefault();
        if (this.fieldsOk(event.target)) {
            let newUser = {
                userName: event.target.name.value,
                nickName: event.target.nickname.value,
                password: event.target.password.value,
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
        this.setState({ profileImageSrc: event.target.files[0] });
        return;
        let fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) this.setState({ profileImageSrc: fileReader.result, fileName: event.target.files[0] })
        }
        fileReader.readAsDataURL(event.target.files[0])
    }
    submit = (e) => {
        e.preventDefault()
        this.verifyReg(e)
    }
    render() {
        return (
            <div className="right_side">
                <h1>Register</h1>

                <label htmlFor='new_user_img_input' id="profPicLabel">

                    <img src={"https://cdn-icons-png.flaticon.com/512/720/720236.png"} id="profPic" />
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
                    <label htmlFor='new_user_pwd' className="two-in-line" id="pwdLabel">
                        <input
                            type={this.state.pwdType}
                            id='new_user_pwd'
                            placeholder="Enter password"
                            name="password"
                            defaultValue=""
                        />
                        <input
                            type={this.state.pwdType}
                            id='new_user_pwd_ver'
                            placeholder="Validate password"
                            name="passwordVer"
                            defaultValue=""
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
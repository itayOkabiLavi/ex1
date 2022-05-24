import React, { useEffect } from 'react'
import RegisterComp from './RegisterComp'
import './Login.css'
import users from '../database/users'
import { api } from '../api.js'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.defaultLoginNote = "Start chatting with your imaginary friends now!"
        this.original = <span>And yes, the design and logo are all original.. So give us a some credit
            <i className="bi bi-hand-thumbs-up"></i></span>
        this.state = {
            registerClicked: false,
            sideNote: "",
            wrongUpwdOrUName: false
        }
        this.setToken = props.setToken
    }

    handleSubmit(e) {
        e.preventDefault();
        const mainThis = this
        var formdata = new FormData();
        formdata.append("name", e.target[0].value);
        formdata.append("password",e.target[1].value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch(api.getLogin_URL(), requestOptions).then(function (response) {
            console.log(response.status)
            if (response.status != 200) {
                console.log('login denied');
                mainThis.setState({ wrongUpwdOrUName: "Wrong user name or passsword" });
                mainThis.setToken("");
            } else {
                response.json().then((userInfoResJson) => {
                    console.log('access approved');
                    let user = userInfoResJson.user;
                    let token = userInfoResJson.token;
                    mainThis.setState({ wrongUpwdOrUName: " " });
                    // mainThis.setToken({
                    //     user:user,
                    //     userToken: token,
                    //   });
                    mainThis.setToken(token);
                })
            }
        }
        )
    }
    switchToRegister() {
        this.setState({
            registerClicked: true
        })
    }
    registerNotes = (newNotes) => {
        this.setState({ sideNote: newNotes })
    }
    switchToLogin = () => {
        this.setState({
            registerClicked: false
        })
    }
    render() {
        return (
            <div id="login_bg">
                <img src='./logo white on blue.png' />
                <div id="login_register_wrapper">
                    <div id='login_window'>
                        <div id="side_window">
                            <h1>Welcome to Bubble</h1>
                            <br />
                            {this.state.registerClicked
                                ? <p>{this.state.sideNote}</p>
                                : <div>
                                    <h2>{this.defaultLoginNote}</h2>
                                    {this.original}
                                </div>
                            }
                        </div>

                        {this.state.registerClicked
                            ? <RegisterComp
                                showLogin={this.switchToLogin}
                                setToken={this.setToken}
                                setNotes={this.registerNotes}
                            />
                            :
                            <form onSubmit={(e) => this.handleSubmit(e)} className="right_side">
                                <h1>Login</h1>
                                <br />
                                <br />
                                <input autoFocus name='userName' type="text" placeholder='User name' />
                                <input name='password' type="password" placeholder='Password' />
                                <h4>{this.state.wrongUpwdOrUName}</h4>
                                <div className='ending_buttons'>
                                    <button type='submit' onSubmit={(e) => this.handleSubmit(e)}>
                                        Submit
                                    </button>
                                    <h3>Not Registered yet?
                                        <button type="button" onClick={(e) => { this.switchToRegister() }}
                                            style={{ color: "aliceblue", backgroundColor: "rgb(240, 0, 104)" }}>
                                            Register now!
                                        </button>
                                    </h3>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
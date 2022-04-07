import React from 'react'
import RegisterComp from './RegisterComp'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.defaultLoginNote = "Start chatting with your imaginary friends now!"
        this.state = {
            users: [
                {
                    userName: 'goku',
                    password: 'gohan1',
                    isMail: true,
                    contactInfo: 'asd@gmail.com',
                    img: 'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg'
                },
                {
                    userName: 'vegeta',
                    password: 'bulma2',
                    isMail: true,
                    contactInfo: 'asd@gmail.com',
                    img: 'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg'
                }
            ],
            registerClicked: false,
            sideNote: ""
        }
        this.setToken = props.setToken
    }
    handleSubmit(e) {
        e.preventDefault();
        let name = e.target[0].value
        let pass = e.target[1].value
        console.log("myUsers: ", this.state.users);
        let userIndex = this.state.users.findIndex((x) => { return x.userName === name && x.password === pass; })
        let newUser = (userIndex !== -1) ? this.state.users[userIndex] : null
        console.log("login result : ", newUser)
        this.setToken({ authed: userIndex !== -1, user: newUser});
    }
    switchToRegister() {
        this.setState({ 
            registerClicked: true
        })
        console.log(this.state.registerClicked, "register");
    }
    registerNotes = (newNotes) => {
        this.setState({sideNote: newNotes})
    }
    switchToLogin = () => {
        this.setState({ 
            registerClicked: false
        })
        console.log(this.state.registerClicked, "login");
    }
    pushNewUser = (userDetails) => {
        let newUser = {
            userName: userDetails.name,
            password: userDetails.password,
            isMail: userDetails.isMail,
            contact: userDetails.contact,
            img: userDetails.img
        }
        let updatedUsers = this.state.users
        updatedUsers.push(newUser)
        this.setState({
            users: updatedUsers
        })
        console.log("new user addded ", newUser, "now:\n", this.state.users)
    }
    render() {
        return (
            <div id="login_bg">
                <div id="login_register_wrapper">
                     <div id='login_window'>
                            <div id="side_window">
                                <h1>Welcome to Bubble</h1>
                                <br/>
                                {this.state.registerClicked 
                                ? <p>{this.state.sideNote}</p>
                                :<h2>{this.defaultLoginNote}</h2>
                                }
                            </div>
                        
                            {this.state.registerClicked
                        ? <RegisterComp
                            importedUsers={this.state.users}
                            addUser={this.pushNewUser}
                            showLogin={this.switchToLogin}
                            setNotes={this.registerNotes}
                        />
                        :
                            <form onSubmit={(e) => this.handleSubmit(e)} className="right_side">
                                <h1>Login</h1>
                                <br/>
                                <br/>
                                <input name='userName' type="text" placeholder='User name' />
                                <input name='password' type="password" placeholder='Password'/>
                                <div className='ending_buttons'>
                                    <button type='submit' onSubmit={(e) => this.handleSubmit(e)}
                                       >
                                    Submit
                                    </button>
                                    <h3>Not Registered yet? What a noob.
                                        <button type="button" onClick={(e) => { this.switchToRegister() }}
                                        style={{color:"aliceblue", backgroundColor:"rgb(240, 0, 104)"}}>
                                        Join the community now!
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
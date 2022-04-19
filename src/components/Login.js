import React,{useEffect} from 'react'
import RegisterComp from './RegisterComp'
import './Login.css'
import users from '../database/users'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.defaultLoginNote = "Start chatting with your imaginary friends now!"
        this.original = <span>And yes, the design and logo are all original.. So give us a some credit
        <i class="bi bi-hand-thumbs-up"></i></span>
        this.state = {
            // users: [...users],
            registerClicked: false,
            sideNote: "",
            wrongUpwdOrUName: false
        }
        this.setToken = props.setToken
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let name = e.target[0].value
        let pass = e.target[1].value
        console.log("myUsers: ", users);
        let userIndex = users.findIndex((x) => { return x.userName === name && x.password === pass; })
        let newUser = (userIndex !== -1) ? users[userIndex] : null
        this.setState({
            wrongUpwdOrUName: (userIndex !== -1) ? " " : "Wrong user name or passsword"
        }) 
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
    pushNewUser = (newUser) => {
        let updatedUsers = users
        updatedUsers.push(newUser)
        this.setState({
            users: updatedUsers
        })
        console.log("new user addded ", newUser, "now:\n", users)
    }
    render() {
        return (
            <div id="login_bg">
                <img src='./logo white on blue.png'/>
                <div id="login_register_wrapper">
                     <div id='login_window'>
                            <div id="side_window">
                                <h1>Welcome to Bubble</h1>
                                <br/>
                                {this.state.registerClicked 
                                ? <p>{this.state.sideNote}</p>
                                :<div>
                                    <h2>{this.defaultLoginNote}</h2>
                                    {this.original}
                                </div>
                                }
                            </div>
                        
                            {this.state.registerClicked
                        ? <RegisterComp
                            importedUsers={users}
                            addUser={this.pushNewUser}
                            showLogin={this.switchToLogin}
                            setToken={this.setToken}
                            setNotes={this.registerNotes}
                        />
                        :
                            <form onSubmit={(e) => this.handleSubmit(e)} className="right_side">
                                <h1>Login</h1>
                                <br/>
                                <br/>
                                <input autoFocus name='userName' type="text" placeholder='User name' />
                                <input name='password' type="password" placeholder='Password'/>
                                <h4>{this.state.wrongUpwdOrUName}</h4>
                                <div className='ending_buttons'>
                                    <button type='submit' onSubmit={(e) => this.handleSubmit(e)}>
                                    Submit
                                    </button>
                                    <h3>Not Registered yet?
                                        <button type="button" onClick={(e) => { this.switchToRegister() }}
                                        style={{color:"aliceblue", backgroundColor:"rgb(240, 0, 104)"}}>
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
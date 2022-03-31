import React from 'react'
import RegisterComp from './RegisterComp'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [
                {userName: 'goku',
                password: 'gohan',
                isMail: true,
                contactInfo: 'asd@gmail.com',
                img: <img src='https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg'/>
                }
            ],
            registerClicked: false
        }
        this.setToken = props.setToken
    }
    handleSubmit (e) {
        e.preventDefault();
        let name = e.target[0].value
        let pass = e.target[1].value
        let token = this.state.users.findIndex((x) => { return x.userName === name && x.password === pass; }) !== -1
        console.log(name, pass, token);
        this.setToken(token);
    }
    switchToRegister() { 
        this.setState({registerClicked: true})
        console.log(this.state.registerClicked,"register");
    }
    addUser(userDetails) {
        this.setState({
            users: this.state.users.push (
                {userName:   userDetails.name,
                password:   userDetails.password,
                isMail:     userDetails.isMail,
                contact:    userDetails.contact,
                img:        userDetails.img}
            )
        })
    }
    render (){
    return (
        <div id="login_register_wrapper">
        {this.state.registerClicked 
        ? <RegisterComp 
            importedUsers={this.state.users}
            addUser={this.addUser}
            showLogin={()=>{
                this.setState({registerClicked: false})
                console.log(this.state.registerClicked,"login");
            }}    
        /> 
        : <div className="log_reg_window" id='login_window'>
                <h1>Please Log In</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <label>
                        <p>Username</p>
                        <input name='userName' type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input name='password' type="password" />
                    </label>
                    <div className='ending_buttons'>
                        <button type='submit' onSubmit={(e)=>this.handleSubmit(e)}>Submit</button>
                        <button onClick={(e)=>{this.switchToRegister()}}>Register!</button>
                    </div>
                </form>
            </div>
        }
        </div>
    )}
}

export default Login
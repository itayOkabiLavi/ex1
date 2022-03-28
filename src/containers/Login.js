import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log("hi")
    }
    return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="name" placeholder="Enter User Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
    // return (<div className="Login" >
    //     <form onSubmit={handleSubmit} >
    //         <input className="loginInput"
    //             name="username"
    //             type="text"
    //             onChange={
    //                 (e) => setEmail(e.target.value)} >
    //         </input>
    //         <input className="loginInput"
    //             name="password"
    //             type="text"
    //             onChange={
    //                 (e) => setPassword(e.target.value)} >
    //         </input>
    //     </form>
    // </div>
    // <div className="Login">
    //   <Form onSubmit={handleSubmit}>
    //     <Form.Group controlId="email">
    //       <Form.FloatingLabel>User Name</Form.FloatingLabel>
    //       <Form.Control
    //         autoFocus
    //         type="User Name"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="password">
    //     <Form.FloatingLabel>Password</Form.FloatingLabel>
    //     <Form.Control
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Button block type="submit" disabled={!validateForm()}>
    //       Login
    //     </Button>
    //   </Form>
    // </div>
    // );
}
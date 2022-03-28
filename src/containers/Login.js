import React from "react";
import Form from "react-bootstrap/Form"
import Container from 'react-bootstrap/Container';

import './Login.css'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.userName = { value: '' }
        this.password = { value: '' }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        console.log(event.target)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('hi')
    }

    render() {
        return (
            <Container className="p-5 mb-4 bg-light rounded-3">
                <Form onSubmit={this.handleSubmit} className="mb-3">
                    <Form.Group>
                        <Form.Label >User Name</Form.Label>
                        <input type="text" value={this.userName.value} autoFocus onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <input type="text" value={this.password.value} onChange={this.handleChange} />
                    </Form.Group>
                    <input type="submit" value="Sign In" />
                </Form>
            </Container>

        );
    }
}
export default Login
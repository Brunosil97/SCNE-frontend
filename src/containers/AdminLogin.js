import React, { Component } from 'react';
import '../index.scss'
import API from '../API'
import { Button, Divider, Form } from 'semantic-ui-react'

class AdminLogin extends Component {
    state = { 
        username: "",
        password: ''
     }

    handleSubmit = event => {
        event.preventDefault()
        API.signIn(this.state)
        .then( this.props.handleAuthResponse )
    }

    userTyping = (type,event) => {
        event.preventDefault()
        switch (type) {
            case "name":
                this.setState({username: event.target.value})
            break
            case "password":
                this.setState({password: event.target.value})
            break
            default:
            break
        }
    }

    render() { 
        return ( 
            <div>
                <Form id="admin-form" onSubmit={this.handleSubmit}>
                    <Form.Group className="inputs" >
                    <Form.Field
                        type="text"
                        control='input'
                        onChange={(event) => this.userTyping("name",event)}
                    />
                    <Form.Field
                        type="password"
                        control='input'
                        onChange={(event) => this.userTyping("password",event)}
                    />
                    </Form.Group>
                <Button className="admin-button" type='submit'>SCNE</Button>
                <Divider hidden/>
                </Form>
            </div>
         );
    }
}
 
export default AdminLogin;
import React, { Component } from 'react';
import API from '../API'

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
            <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" onChange={(event) => this.userTyping("name",event)}></input><br/>
             <input type="password" name="password" onChange={(event) => this.userTyping("password",event)}/><br/>
             <input type="submit" value="Sign In"/>
            </form>
         );
    }
}
 
export default AdminLogin;
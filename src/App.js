import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import MusicDashboard from './containers/MusicDashboard'
import HomeComponent from './components/HomeComponent'
import API from './API'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      username: ''
    }
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validate(localStorage.token)
        .then( admin => this.signIn(admin))
    }
  }

  signIn = (admin) => {
    if (admin.token) {
    localStorage.token = admin.token
    debugger
    this.setState({
      username: admin.username
    })} 
  }

  signOut = () => {
    this.setState({
      username: ""
      })
      localStorage.removeItem("token")
    }
   
  

  render() {
    return (
      <div>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/admin_login" component={(props) => <AdminLogin signIn={this.signIn}{...props}/>}/>
        <Route exact path="/music" component={(props) => <MusicDashboard {...props} signOut={this.signOut}/>}/>
      </div>
    );
  }
}

export default withRouter(App)

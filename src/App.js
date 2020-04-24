import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import MusicDashboard from './containers/MusicDashboard'
import HomeComponent from './components/HomeComponent'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      adminLoggedIn: false,
      username: ''
    }
  }

  signIn = (admin) => {
    localStorage.token = admin.token
    admin.token = undefined
    this.setState({
      adminLoggedIn: !this.state.adminLoggedIn,
      username: admin.username
    })
  }

  signOut = () => {
    this.setState({
      adminLoggedIn: !this.state.adminLoggedIn,
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

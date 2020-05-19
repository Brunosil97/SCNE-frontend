import React from 'react';
import './App.css';
import './index.css'
import { Route, withRouter } from 'react-router-dom'
import AdminLogin from './containers/AdminLogin'
import MusicDashboard from './containers/MusicDashboard'
import HomeComponent from './containers/HomeComponent'
import AboutComponent from './components/AboutComponent'
import NavBar from './Navbar/Navbar'
import API from './API'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      username: '',
    }
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validate(localStorage.token)
        .then( this.signIn )
    }
  }


  
  signIn = (admin) => {
    if (!admin.error) {
      localStorage.token = admin.token
      this.setState({
        username: admin.username,
      })
    }
  }
  
  signOut = () => {
    this.setState({
      username: ""
    })

    localStorage.removeItem("token")
  }


  render() {
    return (
      <div className="full-background" >
        <NavBar signOut={this.signOut}/>
        <Route exact path="/" render={(props) => <HomeComponent {...props}/>} />
        {/* <Route exact path="/about" component={AboutComponent}/> */}
        <Route exact path="/admin_login" render={(props) => <AdminLogin handleAuthResponse={this.signIn} {...props}/>}/>
        <Route exact path="/music" render={(props) => <MusicDashboard {...props} signOut={this.signOut}/>}/>
      </div>
    );
  }
}

export default withRouter(App)

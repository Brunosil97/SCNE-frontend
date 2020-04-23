import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'

class MusicDashboard extends Component {
    state = { 
        songs: []
     }

     componentDidMount() {
        API.getFetch("songs")
        .then(songs => this.setState({songs: songs}))
     }


    render() { 
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               <MusicComponent songs={this.state.songs}/>
            </div>
         );
    }
}
 
export default MusicDashboard;
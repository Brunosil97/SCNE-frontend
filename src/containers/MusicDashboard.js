import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar'

class MusicDashboard extends Component {
    state = {  }


    render() { 
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
            </div>
         );
    }
}
 
export default MusicDashboard;
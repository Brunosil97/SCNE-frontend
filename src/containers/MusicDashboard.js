import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'

class MusicDashboard extends Component {
    state = { 
        songs: [],
        searchFilter: ''
     }

     componentDidMount() {
        API.getFetch("songs")
        .then(songs => this.setState({songs: songs}))
     }

    songsFilteredBySearch = () => {
        const filteredSongs = this.state.searchFilter
        ? this.state.songs.filter(song => song.title.includes(this.state.searchFilter))
        : this.state.songs
        return filteredSongs
    }

    updateSearchFilter = event => {
        this.setState({
            searchFilter: event.target.value
        })
    }


    render() { 
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               <SearchBar updateSearchFilter={this.updateSearchFilter}/>
               <MusicComponent songs={this.songsFilteredBySearch()}/>
            </div>
         );
    }
}
 
export default MusicDashboard;
import React from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'
import SongForm from '../containers/SongForm'

class MusicDashboard extends React.PureComponent {
    constructor(){
        super()
        this.state = { 
            songs: [],
            searchFilter: ''
         }
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

    deleteSong = (song) => {
        API.deleteFetch(`/songs/${song.id}`)
        .then(allsongs => this.setState({songs: allsongs ? allsongs : []}))
    }


    render() { 
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               {localStorage.token ? <SongForm/> : <SearchBar updateSearchFilter={this.updateSearchFilter} />}
               <MusicComponent songs={this.songsFilteredBySearch()} deleteSong={this.deleteSong}/>
            </div>
         );
    }

    componentWillUnmount() {
        this.setState({songs: []})
    }
}
 
export default MusicDashboard;
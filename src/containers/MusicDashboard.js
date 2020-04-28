import React from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'
import NewSongForm from '../containers/NewSongForm'
import EditSongForm from '../containers/EditSongForm'
import { DirectUpload } from 'activestorage';

class MusicDashboard extends React.PureComponent {
    constructor(){
        super()
        this.state = { 
            songs: [],
            searchFilter: '',
            selectecSong: [],
            editSong: false
        }
    }
    componentDidMount() {
        this.getSongs()
     }

    getSongs() {
        API.getFetch("songs")
        .then(songs => this.setState({songs: songs}))
    }

    updateSearchFilter = event => {
        this.setState({
            searchFilter: event.target.value
        })
    }
    
    songsFilteredBySearch = () => {
        const filteredSongs = this.state.searchFilter
        ? this.state.songs.filter(song => song.title.toLowerCase().includes(this.state.searchFilter))
        : this.state.songs
        return filteredSongs
    }

    deleteSong = (song) => {
        API.deleteFetch(`/songs/${song.id}`)
        .then(() => this.getSongs())
    }

    updateStateToEditSong = (song) => {
        this.setState({
            selectecSong: song,
            editSong: true 
        })
    }

    uploadFile = (file, songId) => {
        const BASE_URL = "http://localhost:3000"
        const upload_url = `${BASE_URL}/rails/active_storage/direct_uploads`
        const upload = new DirectUpload(file, upload_url)
        return upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`${BASE_URL}/songs/${songId}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({image: blob.signed_id})
                })
                .then(() => this.getSongs())
            }
        })
    }

    render() { 
        const {editSong, selectecSong} = this.state
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               {localStorage.token ? 
               <NewSongForm uploadFile={this.uploadFile}/> 
               : <SearchBar updateSearchFilter={this.updateSearchFilter} />}
               {editSong ? <EditSongForm song={selectecSong} uploadFile={this.uploadFile}/> : null}
               <MusicComponent songs={this.songsFilteredBySearch()} deleteSong={this.deleteSong} 
               updateStateToEditSong={this.updateStateToEditSong} />
            </div>
         );
    }
}
 
export default MusicDashboard;

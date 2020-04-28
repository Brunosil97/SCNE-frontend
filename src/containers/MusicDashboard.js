import React from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'
import SongForm from '../components/SongForm'
import EditSongForm from '../components/EditSongForm'
import { DirectUpload } from 'activestorage';

class MusicDashboard extends React.PureComponent {
    constructor(){
        super()
        this.state = { 
            songs: [],
            searchFilter: '',
                title: '',
                artist: '',
                image: {},
                spotify: '',
                soundcloud: '',
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
        ? this.state.songs.filter(song => song.title.includes(this.state.searchFilter))
        : this.state.songs
        return filteredSongs
    }

    deleteSong = (song) => {
        API.deleteFetch(`/songs/${song.id}`)
        .then(() => this.getSongs())
    }

    newSongInState = event => {
        if (event.target.name === "image") {
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
        this.setState({
            [event.target.name]: event.target.value
        })}
    }

    updateStateToEditSong = (song) => {
        this.setState({
            selectecSong: song,
            editSong: true 
        })
    }

    editSubmit = (event) => {
        console.log("hi")
    }

    handleSubmit = (event) => {
        const BASE_URL = "http://localhost:3000"
        event.preventDefault()
        let song = {
            title: this.state.title,
            artist: this.state.artist,
            spotify: this.state.spotify,
            soundcloud: this.state.soundcloud
        }
        API.post(`${BASE_URL}/songs`, song)
        .then(res => res.json())
        .then(song => {this.uploadFile(this.state.image, song)})
    }

    uploadFile = (file, songId) => {
        const BASE_URL = "http://localhost:3000"
        const upload_url = `${BASE_URL}/rails/active_storage/direct_uploads`
        const upload = new DirectUpload(file, upload_url)
        return upload.create((error, blob) => {
            debugger
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
        const {title, artist, spotify, soundcloud, editSong, selectecSong} = this.state
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               {localStorage.token ? 
               <SongForm handleSubmit={this.handleSubmit} newSongInState={this.newSongInState} 
               title={title} artist={artist} spotify={spotify} soundcloud={soundcloud}/> 
               : <SearchBar updateSearchFilter={this.updateSearchFilter} />}
               {editSong ? <EditSongForm song={selectecSong} newSongInState={this.newSongInState} editSubmit={this.editSubmit}/> : null}
               <MusicComponent songs={this.songsFilteredBySearch()} deleteSong={this.deleteSong} 
               updateStateToEditSong={this.updateStateToEditSong} />
            </div>
         );
    }
}
 
export default MusicDashboard;


// TO CREATE SONG
// upload image
// create song, w/ image_blob_signed_id

// TO UPDATE SONG
// upload image, if there is a new image
// update song, w/ new image if there is one
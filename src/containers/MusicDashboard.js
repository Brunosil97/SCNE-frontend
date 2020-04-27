import React from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'
import SongForm from '../components/SongForm'
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
            selectedSong: []
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
        const {title, artist, spotify, soundcloud} = song
        this.setState({
            title: title,
            artist: artist,
            spotify: spotify ? spotify : "",
            soundcloud: soundcloud ? soundcloud : "",
            selectedSong: song
        })
    }

    handleSubmit = (event) => {
        const BASE_URL = "http://localhost:3000"
        const {title, artist, spotify, soundcloud, selectedSong} = this.state
        event.preventDefault()
        let song = {
            title: title,
            artist: artist,
            spotify: spotify,
            soundcloud: soundcloud
        }
        if (selectedSong.length === 0) {
            API.post(`${BASE_URL}/songs`, song)
            .then(res => res.json())
            .then(song => this.uploadFile(this.state.image, song.id))
        } else {
            API.patch(`songs/${selectedSong["id"]}`, song)
            // .then(song => {
            //     this.uploadFile(this.state.image, song.id)
            // })
        }
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
        const {title, artist, spotify, soundcloud} = this.state
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               {localStorage.token ? 
               <SongForm handleSubmit={this.handleSubmit} newSongInState={this.newSongInState} 
               title={title} artist={artist} spotify={spotify} soundcloud={soundcloud} checked={this.state.checked}/> 
               : <SearchBar updateSearchFilter={this.updateSearchFilter} />}
               <MusicComponent songs={this.songsFilteredBySearch()} deleteSong={this.deleteSong} 
               updateStateToEditSong={this.updateStateToEditSong} />
            </div>
         );
    }
}
 
export default MusicDashboard;
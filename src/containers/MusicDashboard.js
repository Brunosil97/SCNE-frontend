import React from 'react';
import NavBar from '../Navbar/Navbar'
import MusicComponent from '../components/MusicComponent'
import API from '../API'
import SearchBar from '../components/SearchBar'
import NewSongForm from '../containers/NewSongForm'
import EditSongForm from '../containers/EditSongForm'
import { DirectUpload } from 'activestorage';
import recordLogo from '../scne_records_frame.png'

class MusicDashboard extends React.PureComponent {
    constructor(){
        super()
        this.state = { 
            songs: [],
            displayedSongs: 0,
            searchFilter: '',
            selectecSong: [],
            editSong: false,
            newSong: false
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

    showFourSongs = (songs) => {
        return songs.slice(this.state.displayedSongs, this.state.displayedSongs + 4)
      }
    
    nextFourSongs = (event) => {
        let newFourSongs = this.state.displayedSongs + 4
        if (newFourSongs >= this.state.songs.length) {
           newFourSongs = 0
        }
        return this.setState({
          displayedSongs: newFourSongs
        })
    }

    PreviousFourSongs = (event) => {
        let newFourSongs = this.state.displayedSongs - 4
        if (newFourSongs <= this.state.songs.length) {
           newFourSongs = 0
        }
        return this.setState({
          displayedSongs: newFourSongs
        })
    }
    
    songsFilteredBySearch = () => {
        const filteredSongs = this.state.searchFilter
        ? this.state.songs.filter(song => song.title.toLowerCase().includes(this.state.searchFilter))
        : this.state.songs
        return this.showFourSongs(filteredSongs)
    }

    deleteSong = (song) => {
        API.deleteFetch(`/songs/${song.id}`)
        .then(() => this.getSongs())
    }

    updateStateToEditSong = (song) => {
        this.setState({
            selectecSong: song,
            editSong: !this.state.editSong
        })
    }

    hideEditForm = () => {
        this.setState({
            editSong: !this.state.editSong
        })
    }

    changeSongFormState = () => {
        this.setState({
            newSong: !this.state.newSong
        })
    }

    // hideNewForm = () => {
    //     this.setState({
    //         newSong: !this.state.newSong
    //     })
    // }

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
        const {newSong, editSong, selectecSong} = this.state
        return ( 
            <div>
               <NavBar signOut={this.props.signOut}/>
               <img className="camo-logo" src={recordLogo} alt=""/>

               {localStorage.token ? null
               : <SearchBar updateSearchFilter={this.updateSearchFilter} />}
               
               {newSong ? <NewSongForm 
               uploadFile={this.uploadFile}
               changeSongFormState={this.changeSongFormState}/>: null}

               {editSong ? <EditSongForm 
               editSong={this.state.editSong}
               song={selectecSong} 
               uploadFile={this.uploadFile} 
               hideEditForm={this.hideEditForm}/> : null}

               {localStorage.token ?
               <div id="new-form">
               <button className="button" onClick={this.changeSongFormState}>Add Song</button>
               </div> : null}

               <MusicComponent 
               songs={this.songsFilteredBySearch()} 
               deleteSong={this.deleteSong} 
               updateStateToEditSong={this.updateStateToEditSong} 
               nextFourSongs={this.nextFourSongs}
               previousFourSongs={this.PreviousFourSongs} />
            </div>
         );
    }
}
 
export default MusicDashboard;

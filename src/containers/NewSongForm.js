import React from 'react';
import API from '../API';


class NewSongForm extends React.Component {
    state = { 
        title: '',
        artist: '',
        image: null,
        spotify: '',
        soundcloud: '',
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

     handleSubmit = (event) => {
        const BASE_URL = "http://localhost:3000"
        event.preventDefault()
        let song = {
            title: this.state.title,
            artist: this.state.artist,
            spotify: this.state.spotify,
            soundcloud: this.state.soundcloud
        }
        if (this.state.image) {
            API.post(`${BASE_URL}/songs`, song)
            .then(res => res.json())
            .then(song => {this.props.uploadFile(this.state.image, song.id)})
        } else {
            alert("No Image Detected")
        }
    }

    render() { 
        const {title, artist, spotify, soundcloud} = this.state
        return ( 
            <form className="new-form"onSubmit={this.handleSubmit}>
                <label>Title:</label>
                <input type="text" placeholder="title" name="title" value={title} onChange={this.newSongInState}></input>
                <label>Artist:</label>
                <input type="text" placeholder="artist" name="artist" value={artist} onChange={this.newSongInState}></input>
                <label>Image:</label>
                <input type="file" accept=".png, .jpg, .jpeg" name="image" onChange={this.newSongInState}></input>
                <label>Spotify</label>
                <input type="text"  placeholder="spotify" name="spotify" value={spotify} onChange={this.newSongInState}></input>
                <label>Soundcloud:</label>
                <input type="text" placeholder="soundcloud" name="soundcloud" value={soundcloud} onChange={this.newSongInState}></input>
                <input type="submit" value="Add Song"></input>
            </form>
         );
    }
}
 
export default NewSongForm;
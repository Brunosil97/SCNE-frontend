import React, { Component } from 'react';
import API from '../API'
import { DirectUpload } from 'activestorage';

class NewSong extends Component {
    state = { 
        title: '',
        artist: '',
        image: {},
        spotify: '',
        soundcloud: ''
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
        API.post(`${BASE_URL}/songs`, song)
        .then(res => res.json())
        .then(song => {this.uploadFile(this.state.image, song)})
    }

    uploadFile = (file, song) => {
        const BASE_URL = "http://localhost:3000"
        const upload_url = `${BASE_URL}/rails/active_storage/direct_uploads`
        const upload = new DirectUpload(file, upload_url)
        return upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`${BASE_URL}/songs/${song.id}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({image: blob.signed_id})
                }).then(res => res.json()).then(data => console.log(data))
            }
        })
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={this.state.title} onChange={this.newSongInState}></input>
                <label>Artist:</label>
                <input type="text" name="artist" value={this.state.artist} onChange={this.newSongInState}></input>
                <label>Image:</label>
                <input type="file" name="image" onChange={this.newSongInState}></input>
                <label>Spotify</label>
                <input type="text" name="spotify" value={this.state.spotify} onChange={this.newSongInState}></input>
                <label>Soundcloud:</label>
                <input type="text" name="soundcloud" value={this.state.soundcloud} onChange={this.newSongInState}></input>
                <input type="submit" value="Add Song"></input>
            </form>
         );
    }
}
 
export default NewSong;
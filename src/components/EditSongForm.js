
import { DirectUpload } from 'activestorage';
import React from 'react';
import API from '../API';

class EditSongForm extends React.Component {
    state = { 
        song: this.props.song,
        title: this.props.song.title,
        artist: this.props.song.artist,
        image: {},
        spotify: this.props.song.spotify,
        soundcloud: this.props.song.soundcloud
     }

    EditSubmit = (event) => {
        const {song, title, artist, image, spotify, soundcloud} = this.state
        event.preventDefault()
        let selectedSong = {
            title: title,
            artist: artist,
            spotify: spotify,
            soundcloud: soundcloud
        }
        API.patch(`update_song/${song.id}`, selectedSong)
        .then(song => {this.props.uploadFile(this.state.image, song.id)})
    }

    newSongInState = event => {
        if (event.target.name === "image") {
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    render() { 
        const {title, artist, spotify, soundcloud} = this.state
        return ( 
            <form onSubmit={this.EditSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={title} onChange={this.newSongInState}></input>
                <label>Artist:</label>
                <input type="text" name="artist" value={artist} onChange={this.newSongInState}></input>
                <label>Image:</label>
                <input type="file" name="image" onChange={this.newSongInState}></input>
                <label>Spotify</label>
                <input type="text" name="spotify" value={spotify ? spotify : ""} onChange={this.newSongInState}></input>
                <label>Soundcloud:</label>
                <input type="text" name="soundcloud" value={soundcloud ? soundcloud : ""} onChange={this.newSongInState}></input>
                <input type="submit" value="Edit Song"></input>
            </form>
         );
    }
}
 
export default EditSongForm;
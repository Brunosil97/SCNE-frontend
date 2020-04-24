import React, { Component } from 'react';

class NewSong extends Component {
    state = { 
        title: '',
        artist: '',
        image: {},
        spotify: '',
        soundcloud: ''
     }

    newSongInState = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() { 
        return ( 
            <form>
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
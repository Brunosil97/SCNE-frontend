import React, { Component } from 'react';


const SongForm = (props) => {
  
    const {title, artist, spotify, soundcloud, handleSubmit, newSongInState} = props

        return ( 
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={title} onChange={newSongInState}></input>
                <label>Artist:</label>
                <input type="text" name="artist" value={artist} onChange={newSongInState}></input>
                <label>Image:</label>
                <input type="file" name="image" onChange={newSongInState}></input>
                <label>Spotify</label>
                <input type="text" name="spotify" value={spotify} onChange={newSongInState}></input>
                <label>Soundcloud:</label>
                <input type="text" name="soundcloud" value={soundcloud} onChange={newSongInState}></input>
                <input type="submit" value="Add Song"></input>
            </form>
         );
    
}
 
export default SongForm;
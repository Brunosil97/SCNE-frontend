import React from 'react';


const EditSongForm = (props) => {
  
    const {title, artist, spotify, soundcloud} = props.song
    const {newSongInState, EditSubmit} = props

        return ( 
            <form onSubmit={EditSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={title} onChange={newSongInState}></input>
                <label>Artist:</label>
                <input type="text" name="artist" value={artist} onChange={newSongInState}></input>
                <label>Image:</label>
                <input type="file" name="image" onChange={newSongInState}></input>
                <label>Spotify</label>
                <input type="text" name="spotify" value={spotify ? spotify : ""} onChange={newSongInState}></input>
                <label>Soundcloud:</label>
                <input type="text" name="soundcloud" value={soundcloud ? soundcloud : ""} onChange={newSongInState}></input>
                <input type="submit" value="Edit Song"></input>
            </form>
         );
    
}
 
export default EditSongForm;
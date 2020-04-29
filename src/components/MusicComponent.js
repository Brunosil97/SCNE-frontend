import React from 'react';
import MusicCard from '../containers/MusicCard'

const MusicComponent = (props) => {

    const song = props.songs.map((song, index) => {
       return <MusicCard key={index} song={song}
       title={song.title} artist={song.artist} image={song.image_url}
       spotify={song.spotify} soundcloud={song.soundcloud} 
       deleteSong={props.deleteSong} updateStateToEditSong={props.updateStateToEditSong}/>
    })

    return (
       <div>
            <div className="create-row">
                {song}
            </div>
                <button onClick={props.nextFourSongs}>More:</button>
        </div>
    )
}

export default MusicComponent
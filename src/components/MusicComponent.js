import React from 'react';
import MusicCard from '../containers/MusicCard'
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';

const MusicComponent = (props) => {

    const song = props.songs.map((song, index) => {
       return <MusicCard key={index} song={song}
       title={song.title} artist={song.artist} image={song.image_url}
       spotify={song.spotify} soundcloud={song.soundcloud} 
       deleteSong={props.deleteSong} updateStateToEditSong={props.updateStateToEditSong}/>
    })

    return (
       <div className="song-container">
            <div className="create-row">
                {song}
            </div>
                <ArrowBackIos className="navigate-songs" onClick={props.previousFourSongs}></ArrowBackIos>
                <ArrowForwardIos className="navigate-songs" onClick={props.nextFourSongs}>More:</ArrowForwardIos>

        </div>
    )
}

export default MusicComponent
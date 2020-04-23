import React, { Component } from 'react';
import MusicCard from './MusicCard'

const MusicComponent = (props) => {

    const song = props.songs.map((song, index) => {
       return <MusicCard key={index}  
       title={song.title} artist={song.artist} image={song.image_url}/>
    })

    return (
       
        <div>
            {song}
        </div>
    )
}

export default MusicComponent
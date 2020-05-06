import React from 'react';
import '../index.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpotify, faSoundcloud} from "@fortawesome/free-brands-svg-icons"


class MusicCard extends React.Component {
    
    buttonRedirect = (name) => {
        switch (name) {
            case "spotify":
                window.open(this.props.spotify, '_blank')
                break;
            case "soundcloud":
                window.open(this.props.soundcloud, '_blank')
                break;
                default:
                break
        }
    }
    
    render() {
        const BASE_URL = "http://localhost:3000"
        const {song, title, image, spotify, soundcloud} = this.props
        return ( 
            <div className="song-card">
                <div>
                <h3 className="song-title">
                    {title}
                </h3>
                <img height="250" width="250" src={`${BASE_URL}/${image}`} alt="">
                </img>
                </div>
                <div id="stream-links">
                    <div className="stream-link">
                    {spotify ? <FontAwesomeIcon className="spotify" icon={faSpotify} name="spotify" onClick={() => this.buttonRedirect("spotify")}/> : null}
                    {soundcloud ? <FontAwesomeIcon className="soundcloud" icon={faSoundcloud} name="soundcloud" onClick={() => this.buttonRedirect("soundcloud")}/> : null}
                    </div>
                </div>
                {
                localStorage.token 
                ? <div id="button-container">
                    <button className="button" onClick={() => this.props.updateStateToEditSong(song)}>Edit</button>
                    <button className="button" onClick={() => this.props.deleteSong(song)}>Delete</button>
                </div> : null
                }
            </div>
         );
    }
}
 
export default MusicCard;
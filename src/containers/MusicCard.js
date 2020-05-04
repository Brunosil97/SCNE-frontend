import React from 'react';
import '../index.scss'
import { Icon} from '@iconify/react';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import soundcloudIcon from '@iconify/icons-logos/soundcloud';



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
                    {spotify ? <Icon className="spotify" icon={spotifyIcon} name="spotify" onClick={() => this.buttonRedirect("spotify")}/> : null}
                    {soundcloud ? <Icon className="soundcloud" icon={soundcloudIcon} name="soundcloud" onClick={() => this.buttonRedirect("soundcloud")}/> : null}
                    </div>
                    {/* {spotify ? <Icon className="spotify" icon={spotifyIcon} name="spotify" onClick={() => this.buttonRedirect("spotify")}/> : null}
                    {soundcloud ? <Icon className="soundcloud" icon={soundcloudIcon} name="soundcloud" onClick={() => this.buttonRedirect("soundcloud")}/> : null} */}
                </div>
                {localStorage.token 
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
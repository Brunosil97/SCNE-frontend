import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import soundcloudIcon from '@iconify/icons-logos/soundcloud';



class MusicCard extends React.Component {

    constructor(){
        super()
        this.state = {
            clicked: false
        }
    }

    checkClickedStatus = () => {
        this.setState({clicked: !this.state.clicked})
    }

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
            <div>
                <div>
                <h2>
                    {title}
                </h2>
                <img height="300" width="300" src={`${BASE_URL}/${image}`} alt="">
                </img>
                </div>
                <button onClick={this.checkClickedStatus}>Streams</button>
                {this.state.clicked 
                ? <div>
                    {spotify ? <Icon icon={spotifyIcon} name="spotify" onClick={() => this.buttonRedirect("spotify")}/> : null}
                    {soundcloud ? <Icon icon={soundcloudIcon} name="soundcloud" onClick={() => this.buttonRedirect("soundcloud")}/> : null}
                </div>: null}
                {localStorage.token 
                ? <div>
                    <button onClick={() => this.props.updateStateToEditSong(song)}>Edit</button>
                    <button onClick={() => this.props.deleteSong(song)}>Delete</button>
                </div> : null
                }
            </div>
         );
    }
}
 
export default MusicCard;
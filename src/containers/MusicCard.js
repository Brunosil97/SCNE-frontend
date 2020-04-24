import React from 'react';

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
                return window.location.href = this.props.spotify
                break;
            case "soundcloud":
                return window.location.href = this.props.soundcloud
                break;
                default:
                break
        }
    }
    
    render() {
        const BASE_URL = "http://localhost:3000"
        const {title, image, spotify, soundcloud} = this.props
        return ( 
            <div>
                <div>
                <h1>
                    {title}
                </h1>
                <img height="300" width="300" src={`${BASE_URL}/${image}`}>
                </img>
                </div>
                <button onClick={this.checkClickedStatus}>Streams</button>
                {localStorage.token 
                ? <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div> : this.state.clicked 
                ? <div>
                    {spotify ? <button name="spotify" onClick={() => this.buttonRedirect("spotify")}>Spotify</button> : null}
                    {soundcloud ? <button name="soundcloud" onClick={() => this.buttonRedirect("soundcloud")}>Soundcloud</button> : null}
                </div>: null
                }
            </div>
         );
    }
}
 
export default MusicCard;
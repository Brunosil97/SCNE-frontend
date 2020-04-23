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
                {this.state.clicked 
                ? <div>
                    <button>Spotify</button>
                    <button>Soundcloud</button>
                </div>: null
                }
            </div>
         );
    }
}
 
export default MusicCard;
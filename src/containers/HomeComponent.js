import React from 'react';
import Iframe from 'react-iframe'
import recordLogo from '../scne_records_frame.png'
import { Button, Divider, Form } from 'semantic-ui-react'
import API from "../API"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faSpotify, faSoundcloud} from "@fortawesome/free-brands-svg-icons"

class HomeComponent extends React.Component {

    state = {
        youtube: ""
    }

    getContent() {
        API.getFetch("contents/1")
        .then(youtubeVid => this.setState({youtube: youtubeVid.youtube}))
    }

    componentDidMount() {
       this.getContent()
    }

    updateYoutubeVid = (event) => {
        event.preventDefault()
        this.setState({
            youtube: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        let key = this.state.youtube.split("v=")[1]
        let link = `https://www.youtube.com/embed/${key}`

        let selectedYoutube = {
            youtube: link
        }
        API.patch("contents/1", selectedYoutube).then(() => this.getContent())
        event.target.reset()
    }

    homeNavigation = (name) => {
        console.log(name)
        switch (name) {
          case "spotify":
              window.open("https://open.spotify.com/artist/1SazduFu1DwfCmCTLoFZGL", '_blank')
              break;
          case "soundcloud":
              window.open("https://soundcloud.com/onthescne", '_blank')
              break;
          case "youtube":
              window.open("https://www.youtube.com/channel/UCkI9GfKcCWjTJN4FKwJI6JA", '_blank')
              break;
          case "instagram":
              window.open("https://www.instagram.com/onthescne/?hl=en", '_blank')
              break;
              default:
              break
      }
    }

    render() {
        return (
            <main>
                <div>
                <img className="camo-logo" src={recordLogo} alt=""/>
                {
                localStorage. token ? 
                <Form id="youtube-form" onSubmit={this.handleSubmit}>
                    <Form.Group className="inputs" >
                        <Form.Field type="text" control='input' onChange={this.updateYoutubeVid}/>
                        <Button className="youtube-button" type='submit'>Change Video</Button>
                    </Form.Group>
                    <Divider hidden/>
                </Form>
                :
                <div>
                    <div className="contact-links">
                        <div id="socials">
                        <FontAwesomeIcon className="youtube" icon={faYoutube} onClick={() => this.homeNavigation("youtube")}/>
                        <FontAwesomeIcon className="spotify" icon={faSpotify} onClick={() => this.homeNavigation("spotify")}/> 
                        <FontAwesomeIcon className="soundcloud" icon={faSoundcloud} onClick={() => this.homeNavigation("soundcloud")}/> 
                        <FontAwesomeIcon className="instagram" icon={faInstagram} onClick={() => this.homeNavigation("instagram")}/> 
                        </div>
                    </div>
                </div> 
                }
                <Iframe className="video" width="853" height="480" position="relative" 
                src={this.state.youtube} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
            </div>
            </main>
        )
    }
}

export default HomeComponent
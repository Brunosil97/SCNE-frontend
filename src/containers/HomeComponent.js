import React from 'react';
import NavBar from '../Navbar/Navbar';
import Iframe from 'react-iframe'
import recordLogo from '../scne_records_frame.png'
import { Icon} from '@iconify/react';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import soundcloudIcon from '@iconify/icons-logos/soundcloud';
import youtubeIcon from '@iconify/icons-logos/youtube';
import instagramIcon from '@iconify/icons-logos/instagram-icon';
import { Button, Divider, Form } from 'semantic-ui-react'
import API from "../API"

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
    
    handleSubmit = () => {
        let selectedYoutube = {
            youtube: this.state.youtube
        }
        API.patch("contents/1", selectedYoutube).then(this.getContent())
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
                {localStorage. token ? 
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
                        <Icon className="Youtube" icon={youtubeIcon} onClick={() => this.homeNavigation("youtube")}/>
                        <Icon className="spotify" icon={spotifyIcon} onClick={() => this.homeNavigation("spotify")}/> 
                        <Icon className="soundcloud" icon={soundcloudIcon} onClick={() => this.homeNavigation("soundcloud")}/> 
                        <Icon className="instagram" icon={instagramIcon} onClick={() => this.homeNavigation("instagram")}/> 
                        </div>
                    </div>
                </div> }
                <Iframe className="video" width="853" height="480" position="relative" 
                src={this.state.youtube} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
            </div>
            </main>
        )
    }
}

export default HomeComponent
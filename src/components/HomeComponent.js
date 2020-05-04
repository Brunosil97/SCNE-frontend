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

const HomeComponent = (props) => {
    return (
        <main>
             <div>
            <NavBar />
            <img className="camo-logo" src={recordLogo} alt=""/>
            {/* {localStorage. token ? 
            <Form id="youtube-form">
                <Form.Group className="inputs" >
                    <Form.Field type="text" control='input' onChange={props.changeHomeVideo}/>
                    <Button className="youtube-button" type='submit'>Change Video</Button>
                </Form.Group>
                <Divider hidden/>
            </Form>
            : */}
            <div>
                <div className="contact-links">
                    <div className="socials">
                    <Icon className="Youtube" icon={youtubeIcon} onClick={() => props.homeNavigation("youtube")}/>
                    <Icon className="spotify" icon={spotifyIcon} onClick={() => props.homeNavigation("spotify")}/> 
                    <Icon className="soundcloud" icon={soundcloudIcon} onClick={() => props.homeNavigation("soundcloud")}/> 
                    <Icon className="instagram" icon={instagramIcon} onClick={() => props.homeNavigation("instagram")}/> 
                    </div>
                </div>
            </div> }
            <Iframe className="video" width="853" height="480" position="relative" 
            src={props.youtubeVid} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
        </div>
        </main>
    )
}

export default HomeComponent
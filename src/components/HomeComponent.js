import React from 'react';
import NavBar from '../Navbar/Navbar';
import YouTube from 'react-youtube-embed'

const HomeComponent = (props) => {
    return (
        <div>
            <NavBar />
            <YouTube id='TNIfvaars80' />
        </div>
    )
}

export default HomeComponent
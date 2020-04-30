import React from 'react';
import NavBar from '../Navbar/Navbar';
import Iframe from 'react-iframe'
import '../index.css'
import recordLogo from '../scne_records_frame.png'

const HomeComponent = (props) => {
    return (
        <div>
            <NavBar />
            <img className="camo-logo" src={recordLogo}/>
            <Iframe className="video" width="853" height="480" position="relative" 
            src="https://www.youtube.com/embed/TNIfvaars80" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
        </div>
    )
}

export default HomeComponent
import React from "react";
import { NavLink } from "react-router-dom";
import skull from '../skull_white.png'

const NavBar = (props) => {
    const signedIn = localStorage.token 
    return (
        <main>
            <div className="navbar-logo">
                <img className="skull" src={skull}></img>
            </div>
            <div className="navbar">
                <div className="navbar-paths">
                <NavLink to="/" exact>
                Home
                </NavLink>
                <NavLink to="/music" exact>
                Music
                </NavLink>
                <a href="https://mailchi.mp/518f91bae3d0/scnesignup">Drops</a>
                <NavLink to="/about" exact>
                About
                </NavLink>
                {signedIn ? <NavLink to="/" onClick={() => props.signOut()}exact>
                SignOut
                </NavLink> : null} 
                </div>
            </div>
        </main>
    )
}

export default NavBar;
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    const signedIn = localStorage.token 
    return (
        <div>
        <NavLink to="/" exact>
              Home
        </NavLink>
        <NavLink to="/music" exact>
            Music
        </NavLink>
        <NavLink to="/about" exact>
            About
        </NavLink>
        {signedIn ? <NavLink to="/" onClick={() => props.signOut()}exact>
            SignOut
        </NavLink> : null} 
        </div>
    )
}

export default NavBar;
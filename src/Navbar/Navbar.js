import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    const signedIn = localStorage.token 
    return (
        <NavLink to="/" exact>
              Home
        </NavLink>,
        <NavLink to="/music" exact>
            Music
        </NavLink>
    

    )
}

export default NavBar;
import React, { Component } from 'react';

const  MusicCard = (props) => {
    const BASE_URL = "http://localhost:3000"
    
        return ( 
            <div>
                <div>
                <h1>
                    {props.title}
                </h1>
                <img height="300" width="300" src={`${BASE_URL}/${props.image}`}>
                </img>
                </div>
            </div>
         );
}
 
export default MusicCard;
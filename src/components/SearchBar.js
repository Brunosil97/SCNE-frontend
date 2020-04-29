import React from 'react';


const SearchBar = (props) => {
    return (
        <div className="search-bar">
           <input type="text" placeholder="Search..."
            onChange={props.updateSearchFilter}/>
        <div className="search"></div>
        </div>
    )
}

export default SearchBar



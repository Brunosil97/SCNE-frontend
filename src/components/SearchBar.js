import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
             <input placeholder="search"
            onChange={props.updateSearchFilter}/>
        </div>
    )
}

export default SearchBar
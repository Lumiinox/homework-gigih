import CustomButton from '../customButton';
import {func} from 'prop-types';
import React from 'react';

const Search = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <input type = "text" placeholder = "Search.." onChange={props.setSearchKeword}></input>
                <br/>
                <br/>
                <CustomButton type="submit">Search</CustomButton>
            </form>
        </>
    )
}

Search.propTypes = {
    onSubmit: func,
    setSearchKeword: func
}
export default Search;
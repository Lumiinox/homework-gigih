import CustomButton from '../customButton';
import axios from 'axios';

const Search = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <input type = "text" placeholder = "Search.." onChange={props.setSearchKeword}></input>
                <CustomButton type="submit">Search</CustomButton>
            </form>
        </>
    )
}

export default Search;
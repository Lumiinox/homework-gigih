import CustomButton from '../customButton';

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

export default Search;
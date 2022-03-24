const Songs = (props) => {
    return(
        <div>
            <img className="song_image" src={props.url} />
            <h3>{props.name}</h3>
            <p>{props.artistName}</p>
            <p>{props.albumName}</p>
            <p>Song Description</p>
            <button type="button">Select</button>
        </div>
    )
}

export default Songs;
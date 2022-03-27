import './index.css';

const Songs = (props) => {
    return(
        <div className='wrapper'>
            <div className='songImageWrapper'>
                <img className="songImage" src={props.url} />
            </div>
            <div className='songInfoWrapper'>
                <h2>{props.name}</h2>
                <p>{props.artistName}</p>
                <p>{props.albumName}</p>
                <button type="button">Select</button>
            </div>
        </div>
    )
}

export default Songs;
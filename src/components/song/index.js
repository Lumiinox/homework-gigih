import './index.css';

const Songs = (props) => {
    return(
        <tr>
            <td><img className="songImage" src={props.url} /></td>
            <td className='textTdElement'>{props.name}</td>
            <td className='textTdElement'>{props.artistName}</td>
            <td className='textTdElement'>{props.albumName}</td>
            <td><button type="button">Select</button></td>
        </tr>
    )
}

export default Songs;
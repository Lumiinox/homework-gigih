import './index.css';
import {useState, setState} from 'react';
import CustomButton from '../customButton';

const Songs = (props) => {
    const [selectedStatus, setSelectedStatus] = useState(true);

    const SwitchStatus = () => {
        setSelectedStatus(!selectedStatus);
        props.selectSong();
    }

    return(
        <>
            <tr>
                <td><img className="songImage" src={props.url} alt=""/></td>
                <td className='textTdElement'>{props.name}</td>
                <td className='textTdElement'>{props.artistName}</td>
                <td className='textTdElement'>{props.albumName}</td>
                <td><CustomButton type="button" onClick={SwitchStatus}>{selectedStatus ? "Select" : "Deselect"}</CustomButton></td>
            </tr>
        </>
    )
}

export default Songs;
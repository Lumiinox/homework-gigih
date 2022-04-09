import './index.css';
import {useState} from 'react';
import CustomButton from '../customButton';
import React from 'react';
import {string, func} from 'prop-types';

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

Songs.propTypes = {
    selectSong: func,
    url: string,
    artistName: string,
    albumName: string,
    name: string
}
export default Songs;
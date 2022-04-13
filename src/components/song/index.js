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
            <div className='child'>
                <div><img className="songImage" src={props.url} alt=""/></div>
                <h2 className='textTdElement'>{props.name}</h2>
                <p className='textTdElement'>{props.artistName}</p>
                <p className='textTdElement'>{props.albumName}</p>
                <div><CustomButton className="songButton" type="button" onClick={SwitchStatus}>{selectedStatus ? "Select" : "Deselect"}</CustomButton></div>
            </div>
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
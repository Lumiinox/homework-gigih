import CustomButton from '../customButton';
import './index.css';
import React from 'react';
import {func} from 'prop-types';

const CreatePlayListForm = (props) => {
    return (
        <>
            <h1>Create Playlist</h1>
            <div className='formWrapper'>
                <form className='createPlaylist' onSubmit={props.onSubmit}>
                    <input type = "text" placeholder = "Playlist Name" onChange={props.onChangeName}></input>
                    <br/>
                    <br/>
                    <textarea type = "text-area" placeholder = "Playlist Description" onChange={props.onChangeDesc}></textarea>
                    <br/>
                    <br/>
                    <CustomButton type="submit" >Create</CustomButton>
                </form>
            </div>
        </>
    )
}

CreatePlayListForm.propTypes = {
    onSubmit: func,
    onChangeName: func,
    onChangeDesc: func
}
export default CreatePlayListForm;
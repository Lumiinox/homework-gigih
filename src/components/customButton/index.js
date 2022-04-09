import {string, func} from 'prop-types';
import React from 'react';

const CustomButton = ({children, onClick}) =>{
    return (
        <button  onClick={onClick}>{children}</button>
    )
}

CustomButton.propTypes = {
    children:string,
    onClick:func
}
export default CustomButton;
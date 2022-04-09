import '../profileCard/index.css';
import React from 'react';
import {string, bool, number} from 'prop-types';

const ProfileCard = (props) => {
    return(
        <>
            {props.loginStatus ? (
                <div className="wrapper">
                    <div className='imageWrapper'>
                        <img src={props.imageUrl} alt="" className='profilePicCard'/>
                    </div>
                    <div className="info">
                        <div className="nameWrapper">
                            <h3 className='userName'>{props.displayName}</h3>
                        </div>
                        <div className="followerWrapper">
                            <h3 className='follower'>Followers: {props.followers}</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="wrapper">
                    <div className="header-container">
                            <h3>Not Logged In</h3>
                    </div>
                </div>
            )}

        </>
    )
}

ProfileCard.propTypes = {
    loginStatus: bool,
    imageUrl: string,
    displayName: string,
    followers: number
}

export default ProfileCard;
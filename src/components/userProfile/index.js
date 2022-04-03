import './index.css';
const ProfileHeader = (props) => {
    return(
        <>
            {props.loginStatus ? (
                <div className="header">
                    <div className="header-container">
                            {/* <img className='profilePic' src={props.imageUrl} alt=""></img> */}
                            <h3 className='userName'>{props.displayName}</h3>
                    </div>
                </div>
            ) : (
                <div className="header">
                    <div className="header-container">
                            <h3>Not Logged In</h3>
                    </div>
                </div>
            )}

        </>
    )
}

export default ProfileHeader;
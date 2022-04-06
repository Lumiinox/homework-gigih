import '../profileHeader/index.css';
const ProfileHeader = (props) => {
    return(
        <>
            {props.loginStatus ? (
                <div className="header">
                    <div className="header-container-left">
                        <img src={props.imageUrl} alt="" className='profilePic'/>
                    </div>
                    <div className="header-container-right">
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
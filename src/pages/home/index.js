import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

import * as CallApi from '../../api-calls/fetchAPI';

import { updateProfileData, removeProfileData } from '../../redux/actions';
import store from '../../redux/store';

import ProfileHeader from '../../components/profileHeader';
import ProfileCard from '../../components/profileCard';

import './index.css';


function Home (){
    const CLIENT_ID = "50617af7a91f49b78dd47bcc7ee69433";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = 'playlist-modify-private';

    const loginStatus = useSelector((state) => state.loginStatus);
    const profilePicUrl = useSelector((state)=>state.picUrl);
    const userName = useSelector((state) => state.userName);
    const followers = useSelector((state) => state.followers);

    useEffect(() => {
        const hash = window.location.hash
        let tokenIn = null;
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");

        }
        console.log(tokenIn);
        if (tokenIn !== null){
            const getUserData = async () => {
                const userData = await CallApi.GetUserData(tokenIn);
                console.log(userData);
                console.log(userData.images[0].url);
                store.dispatch(updateProfileData(userData.display_name, userData.images[0].url, tokenIn, userData.followers.total, userData.id))
                console.log(store.getState());
            }
            getUserData()
        }
      },[])

    const logout = () => {
        store.dispatch(removeProfileData())
    }  

    return(
        <div className='bodyWrapperHome'>
            {loginStatus ? <ProfileHeader 
                    loginStatus = {loginStatus} 
                    imageUrl    = {profilePicUrl}
                    displayName = {userName}
                />
            :
                <ProfileHeader 
                    loginStatus = {loginStatus} 
                    imageUrl    = {""}
                    displayName = {""}
                />
            }
            <div className='contentWrapperHome'>
                <ProfileCard
                    loginStatus = {loginStatus} 
                    imageUrl    = {profilePicUrl}
                    displayName = {userName}
                    followers   = {followers}/>
                    
                {!loginStatus ?
                        <a className="buttonA" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                            to Spotify</a>
                        : <button onClick={logout}>Logout</button>}
                <br/>
                <Link to="/create-playlist">Create Playlist</Link>
            </div>
        </div>
    )
}

export default Home;
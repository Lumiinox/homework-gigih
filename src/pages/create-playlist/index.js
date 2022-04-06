import Songs from '../../components/song/index';
import Search from '../../components/search';
import ProfileHeader from '../../components/profileHeader';
import CreatePlayListForm from '../../components/createPlayListForm';
import store from '../../redux/store';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import * as CallApi from '../../api-calls/fetchAPI';

import './index.css';
import { updateProfileData } from '../../redux/actions';
import { Link } from "react-router-dom";

function CreatePlayList(){

    const [selectedSongUri, setSelectedSongUri] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState("");
    
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlayListDescription] = useState("");

    const [searchStatus, setSearchStatus] = useState(false);

    const loginStatus = useSelector((state) => state.loginStatus);
    const profilePicUrl = useSelector((state)=>state.picUrl);
    const userName = useSelector((state)=>state.userName);
    const token = useSelector((state)=>state.token);
    const userID = useSelector((state)=>state.userId);

    useEffect(() => {
        if(!searchStatus){
            const tempSelectedSong = searchResult.filter((searchResult) => selectedSongUri.includes(searchResult.uri));
            setSearchResult(tempSelectedSong);
        }
    },[selectedSongUri]);

    const CallSpotifySearch = async (e) => {
        e.preventDefault();
        console.log(token);
        console.log(searchKeyword);
        await axios.get(`https://api.spotify.com/v1/search`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKeyword,
                type: "track"
            }
        }).then((response)=>{
            setSearchStatus(true);            
            const tempSelectedSong = searchResult.filter((searchResult) => selectedSongUri.includes(searchResult.uri));
            const tempSearchResult = response.data.tracks.items.filter((searchResult) => !selectedSongUri.includes(searchResult.uri));
            console.log(tempSearchResult);
            console.log(tempSelectedSong);
            setSearchResult([...tempSelectedSong, ...tempSearchResult]);
        }).catch((e) => console.log(e));
    }

    const selectSong = (searchResult) => {
        const tempUri = searchResult.uri;

        if (selectedSongUri.includes(tempUri)){
            setSelectedSongUri(selectedSongUri.filter((item) => item !== tempUri));
        } else {
            setSelectedSongUri([...selectedSongUri, tempUri]);
        }
    }

    const CreatePlaylist = async () => {
        const data = JSON.stringify({
            name: playlistName,
            description: playlistDescription,
            public: false,
            collaborative: false,
        })

        const headerConfig = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type' : 'application/json',
            },
        }

        const response = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`,
            data, 
            headerConfig
        );
        return response.data.id;
    }

    const AddMusicToCreatedPlaylist = async (playListID) => {
        let uris = selectedSongUri;
        console.log("PlayListID")
        console.log(playListID);
        console.log(uris);
        const data = JSON.stringify({
            uris
        });

        const headerConfig = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type' : 'application/json',
            },
        }

        console.log(data);
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playListID}/tracks`,
            data, 
            headerConfig);
        console.log(response);
        alert("PlayList Created");
    }

    const CreateAndAddToPlaylist = async (e) =>{
        e.preventDefault();
        const playListID = await CreatePlaylist();

        await AddMusicToCreatedPlaylist(playListID);
    }

    return(
        <div className='bodyWrapper'>
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
            
        <Link to="/">Back Home</Link>

            {loginStatus && 
                <>
                    <CreatePlayListForm 
                        onChangeName    = {e => setPlaylistName(e.target.value)} 
                        onChangeDesc    = {e => setPlayListDescription(e.target.value)} 
                        onSubmit        = {CreateAndAddToPlaylist}/> 

                    <br/>
                    <br/>
                    <br/>

                    <Search 
                        token           = {token} 
                        setSearchKeword = {e => setSearchKeyword(e.target.value)} 
                        onSubmit        = {CallSpotifySearch}
                    />

                    <br/>

                    <table>
                        <tbody>
                            {searchResult.map((data) => 
                                    <Songs  
                                        key         = {data.id}
                                        url         = {data.album.images[2].url} 
                                        name        = {data.name} 
                                        artistName  = {data.album.artists[0].name} 
                                        albumName   = {data.album.name}
                                        selectSong  = {() => selectSong(data)}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </>
            } 
        </div>
    )
}

export default CreatePlayList;
import Songs from '../components/song/index';
import React, { useEffect, useState } from 'react';
import Search from '../components/search';
import axios from 'axios';
import './PlayList.css';
import ProfileHeader from '../components/userProfile';
import CreatePlayListForm from '../components/createPlayListForm';



function PlayList(){
    const CLIENT_ID = "50617af7a91f49b78dd47bcc7ee69433";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = 'playlist-modify-private';

    const [token, setToken] = useState("");

    const [currentProfileData, setCurrentProfileData] = useState([]);

    const [selectedSongUri, setSelectedSongUri] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState("");
    
    const [userID, setUserID] = useState("");
    
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlayListDescription] = useState("");

    const [searchStatus, setSearchStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        if(!searchStatus){
            const tempSelectedSong = searchResult.filter((searchResult) => selectedSongUri.includes(searchResult.uri));
            setSearchResult(tempSelectedSong);
        }
    },[selectedSongUri]);

    useEffect(() => {
        async function getUserData(){
            await axios.get(`https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then ((response) => {
                setLoginStatus(true);
                console.log(response);
                setCurrentProfileData(response.data);
                setUserID(response.data.id);
                }
            )
        }
        if(token){
            getUserData();
        }
    },[token])

    useEffect(() => {
        const hash = window.location.hash
        let tokenIn
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");

        }
        console.log(`tokenIn ${tokenIn}`)
        setToken(tokenIn)
        console.log(`token ${token}`)
      },[])

    const logout = () => {
        setToken("");
        setLoginStatus(false);
    }  

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
                // imageUrl    = {currentProfileData.images[0].url}
                displayName = {currentProfileData.display_name}
            />
        :
            <ProfileHeader 
                loginStatus = {loginStatus} 
                imageUrl    = {""}
                displayName = {""}
            />
        }
            

            {!token ?
                    <a className="buttonA" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
 
            <br/>

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

export default PlayList;
import Songs from '../components/song/index';
import React, { useEffect, useState } from 'react';
import Search from '../components/search';
import axios from 'axios';
import './PlayList.css';



function PlayList(){
    const CLIENT_ID = "50617af7a91f49b78dd47bcc7ee69433";
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    
    const [selectedSongUri, setSelectedSongUri] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const [token, setToken] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [searchStatus, setSearchStatus] = useState(false);

    useEffect(() => {
        if(!searchStatus){
            const tempSelectedSong = searchResult.filter((searchResult) => selectedSongUri.includes(searchResult.uri));
            setSearchResult(tempSelectedSong);
        }
    },[selectedSongUri]);

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
    }  

    const CallSpotifySearch = async (e) => {
        e.preventDefault();
        console.log(token)
        console.log(searchKeyword)
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

    return(
        <div className='bodyWrapper'>

            <h1>Create Playlist</h1>

            <Search 
                token           = {token} 
                setSearchKeword = {e => setSearchKeyword(e.target.value)} 
                onSubmit        = {CallSpotifySearch}
            />

            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
 
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

        </div>
    )
}

export default PlayList;
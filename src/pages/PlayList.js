// import Songs from '../components/song/index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayList.css';

function PlayList(){
    const CLIENT_ID = "50617af7a91f49b78dd47bcc7ee69433";
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("");
    const [searchKeyword, setSearchKey] = useState("");

    const [songResult, setResult] = useState([]);
    const [selectedSong, setSelectedSong] = useState([]);

    const Songs = (props) => {
        return(
            <>
                <tr>
                    <td><img className="songImage" src={props.url} alt=""/></td>
                    <td className='textTdElement'>{props.name}</td>
                    <td className='textTdElement'>{props.artistName}</td>
                    <td className='textTdElement'>{props.albumName}</td>
                    <td>{!props.selected ? <button type="submit" onClick={()=>AddSongToSelected(props)}>Select</button> : <button type="submit">Deselect</button>}</td>
                </tr>
            </>
        )
    }

    useEffect(() => {
        const hash = window.location.hash
        let tokenIn = window.localStorage.getItem("token")
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");
            
            window.localStorage.setItem("token", tokenIn)
        }
        console.log(`tokenIn ${tokenIn}`)
        setToken(tokenIn)
        console.log(`token ${token}`)
      },[])

    const CallSpotifySearch = (e) => {
        e.preventDefault();
        axios.get(`https://api.spotify.com/v1/search`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKeyword,
                type: "track"
            }
        }).then((response)=>{
            const searchResult = response.data.tracks.items;
            console.log(searchResult);
            if(response){
                setResult(searchResult);
            }
        }).catch((e) => console.log(e));
    }

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }  


    function AddSongToSelected(props){
        let newSelectedSong = selectedSong;
        newSelectedSong.push(props);
        setSelectedSong(newSelectedSong);
        console.log(selectedSong);
    }

    return(
        <div className='bodyWrapper'>

            <h1>Create Playlist</h1>

            <form onSubmit={CallSpotifySearch}>
                <input type="text" placeholder='Search..' onChange={e => setSearchKey(e.target.value)}></input>
                <button type={"submit"}>Search</button>
            </form>

            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
            
            <h3>Selected Song</h3>
            <table>
                <tbody>
                    {!selectedSong && selectedSong.map((data,index) => 
                            <Songs  
                                key         = {index} 
                                uri         = {data.uri} 
                                selected    = {true} 
                                url         = {data.url} 
                                name        = {data.name} 
                                artistName  = {data.artistName} 
                                albumName   = {data.albumName}
                            />
                        )}
                </tbody>
            </table>

            <h3>SearchResult</h3>
            <table>
                <tbody>
                    {songResult.map((data,index) => 
                            <Songs  
                                key         = {index} 
                                uri         = {data.uri} 
                                selected    = {false} 
                                url         = {data.album.images[2].url} 
                                name        = {data.name} 
                                artistName  = {data.album.artists[0].name} 
                                albumName   = {data.album.name}
                            />
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default PlayList;
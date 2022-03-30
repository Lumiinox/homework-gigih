import data from '../data/SpotifyData';
import Songs from '../components/song/index';
import Search from '../components/search/index';
import React, { useEffect } from 'react';
import './PlayList.css';

function PlayList(){
    const spotifySearch = new Search();

    const CLIENT_ID = "50617af7a91f49b78dd47bcc7ee69433";
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    // const songList = data.map((data, id) => 
    //  <Songs  key={id} url={data.album.images[2].url} name={data.name} artistName={data.album.artists[0].name} albumName = {data.album.name}/>
    // );

    const renderResult = () => {
        console.log("TESTING");
        return spotifySearch.state.result.map(data => (
            <div key={data.album.id}><img src={data.album.images[2].url}></img></div>
            
        ))
    }

    useEffect(() => {
        const hash = window.location.hash
        let tokenIn = window.localStorage.getItem("token")
    
        if (!tokenIn && hash) {
            tokenIn = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = "";
            console.log("URI change");
            window.localStorage.setItem("token", tokenIn);
        }
        console.log(tokenIn);
        spotifySearch.receiveToken(tokenIn);
        console.log(spotifySearch.state);
      })

    const logout = () => {
        spotifySearch.clearToken();
        window.localStorage.removeItem("token");
    }  

    return(
        <div className='bodyWrapper'>
            
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            <button onClick={logout}>Logout</button>

            <form onSubmit={spotifySearch.searchCall}>
                <input type="text" onChange={event => spotifySearch.receiveSearchKey(event.target.value)}/>
                <button type={"submit"}>Search</button>
            </form>
            
            {renderResult()}
{/* 
            <h1>Create Playlist</h1>
            <div className="content">
                <table>
                    <tbody>
                        <tr>
                            <td>Image</td>
                            <td>Title</td>
                            <td>Artist</td>
                            <td>Album</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>     
            </div> */}
        </div>
    )
}

export default PlayList;
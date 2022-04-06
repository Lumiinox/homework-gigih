import axios from "axios";

export const CallSpotifySearch = async (token, searchKeyword) => {
    const response = await axios.get(`https://api.spotify.com/v1/search`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKeyword,
            type: "track"
        }
    });
    return response.data;
}

export const GetUserData = async (token) => {
    console.log(token);
    const headerData = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.get(`https://api.spotify.com/v1/me`,headerData)
    return response.data;
}


export const CreatePlaylist = async (playlistName, playlistDescription, userID, token) => {
    const data = JSON.stringify({
        name: playlistName,
        description: playlistDescription,
        public: false,
        collaborative: false,
    })

    const headerConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json',
        },
    }

    const response = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`,
        data, 
        headerConfig
    );
    return response.data;
}

export const AddMusicToCreatedPlaylist = async (selectedSongUri, playListID, token) => {
    let uris = selectedSongUri;
    console.log("PlayListID")
    console.log(playListID);
    console.log(uris);
    const data = JSON.stringify({
        uris
    });

    const headerConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json',
        },
    }

    console.log(data);
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playListID}/tracks`,
        data, 
        headerConfig);
    return response.data;
}

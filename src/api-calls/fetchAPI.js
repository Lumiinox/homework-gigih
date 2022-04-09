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
    console.log("resonse.data.id" + response.data.id);
    return response.data.id;
}

export const AddMusicToCreatedPlaylist = async (data, playListID, token) => {
    const headerConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json',
        },
    }
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playListID}/tracks`,
        data, 
        headerConfig);
    return response.data;
}

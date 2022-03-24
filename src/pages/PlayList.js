import data from '../data/SpotifyData';
import Songs from '../components/song/index';

function PlayList(){
    return(
        <div>
            <h1>Create Playlist</h1>
            <div class="content">
                <Songs url={data.album.images[0].url} name={data.name} artistName={data.album.artists[0].name} albumName = {data.album.name}/>
            </div>
        </div>
    )
}

export default PlayList;
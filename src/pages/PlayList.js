import data from '../data/SpotifyData';
import Songs from '../components/song/index';


function PlayList(){
    console.log(data.album);
    let dataSize = data.length;
    const songList = data.map((data, id) => 
     <Songs  key={id} url={data.album.images[1].url} name={data.name} artistName={data.album.artists[0].name} albumName = {data.album.name}/>
    );
    return(
        <div className='bodyWrapper'>
            <h1>Create Playlist</h1>
            <div className="content">
                {/* <Songs url={data[1].album.images[1].url} name={data[1].name} artistName={data[1].album.artists[0].name} albumName = {data[1].album.name}/> */}
                {songList}
            </div>
        </div>
    )
}

export default PlayList;
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import dataSpotify from './data.js';
import data from './data.js';

function App() {
  console.log(dataSpotify);
  return (
    <div className="App">
      <h1>Create Playlist</h1>
      <div class="content">
        <img className="song_image" src={dataSpotify.album.images[0].url} />
        <h3>{dataSpotify.name}</h3>
        <p>{dataSpotify.album.artists[0].name}</p>
        <p>{dataSpotify.album.name}</p>
        <p>Song Description</p>
        <button type="button">Select</button>
    </div>

    </div>
  );
}

export default App;

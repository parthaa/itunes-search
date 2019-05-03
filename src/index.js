import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import jsonp from 'jsonp';
import ReactAudioPlayer from 'react-audio-player';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs:[],
      name: 'React',
      selectedSong: null
    };
  }

  searchSongHandler = (evt) => {
    this.searchSong(evt.target.value);
  }

  searchSong = (song) => {
    const queryUrl = 'https://itunes.apple.com/search?media=music&term=' + song;
  
    jsonp(queryUrl, null, (err, data) => {
      if (err) {
        console.error(err.message);
      } else {
        this.setState({songs: data.results});
      }
    });
  }
 
  selectedToPlay = (song) => {
    console.log(song);
    this.setState({selectedSong: song});
  }

  renderSongSnippet = () => {
    if (this.state.selectedSong) {
      console.log("new song");
      console.log(this.state.selectedSong);
      return ( <div>
                <ReactAudioPlayer
                  src={this.state.selectedSong.previewUrl}
                  autoPlay
                  controls
                />
          </div>
      );
    }
    return (<div> No song to Play </div>);
  }

  render() {
    const songs = this.state.songs.map(song => {
      return (
        <div onClick={this.selectedToPlay.bind(this, song)} >
          <pre>{song.trackCensoredName}</pre>
        </div>
      );
    });
    return (
      <div>
        {this.renderSongSnippet()}
        <div> 
        <input type="text" onChange={this.searchSongHandler} />
        </div>
        {songs}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

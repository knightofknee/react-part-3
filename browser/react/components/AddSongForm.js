import React, { Component } from 'react';
import Songs from './Songs.js';
import axios from 'axios';

class AddSongForm extends Component {
    constructor(){
        super()
        this.state = {
            songId: '',
            allSongs: []
        }
        this.changeSong = this.changeSong.bind(this);
        this.submitSong = this.submitSong.bind(this);
    }

    componentDidMount(){
        this.getAllSongs();

    }

    submitSong(evt) {
        evt.preventDefault();
        const songId = this.state.songId;
        console.log('playlist.id: ', this.props.playlist.id)
        console.log('songId: ', songId)

        this.props.addSong(songId);
        
    }

    changeSong(evt) {
        const e = evt;
        console.log(e.target.value);
        this.setState({
            songId: e.target.value
        })
    }
    
    getAllSongs() {
        axios.get('/api/songs')
        .then(res => res.data)
        .then(songs => {
            this.setState({
                allSongs: songs,
            })
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     const currentPlaylist =  this.props.playlist;
    //     const nextPlaylist = nextProps.playlist;
    //     if(currentPlaylist !== nextPlaylist){
    //         this.setState({
                
    //         })
    //     }
    // }

    render(){
        const songArray = this.state.allSongs;
        return (  <div className="well">
    <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.submitSong}>
      <fieldset>
        <legend>Add to Playlist</legend>
        <div className="form-group">
          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
          <div className="col-xs-10">
            <select className="form-control" name="song" onChange={this.changeSong}>
                <option>~~~~PICK A SONG~~~~</option>
                {songArray.map(song => {
                    return (<option key={song.id} value={song.id}> {song.name} </option>)
                })}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">Add Song</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>)
    }
}

export default AddSongForm;
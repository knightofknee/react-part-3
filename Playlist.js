import React, { Component } from 'react';
import Songs from './Songs.js';
import axios from 'axios';
import AddSongForm from './AddSongForm.js'

class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            playlist: {}
        }
    }

    componentDidMount() {
        this.setPlaylistById(this.props.match.params.playlistId);   
    }

    setPlaylistById (playlistId) {
        axios.get(`/api/playlists/${playlistId}`)
            .then(res => res.data)
            .then(playlist => {
                this.setState({
                    playlist: playlist,
                })
            })
    }
    
    submitSong(evt) {
        evt.preventDefault();
        const songId = this.state.songId;
        console.log('playlist.id: ', this.props.playlist.id)
        console.log('songId: ', songId)

        axios.post(`/api/playlists/${this.props.playlist.id}/songs`, {id : songId})
    }

    componentWillReceiveProps(nextProps) {
        const nextPlaylistId = nextProps.match.params.playlistId;
        const currentPlaylistId = this.props.match.params.playlistId;
        if (nextPlaylistId !== currentPlaylistId) {
            this.setPlaylistById(nextPlaylistId);
        }
    }

    render() {
        const playlist = this.state.playlist;
        return (<div>
            <h3>{playlist.name}</h3>
            <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
            {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
            <hr />
            <AddSongForm playlist={this.state.playlist}/>
        </div>)
    }
}

export default Playlist;
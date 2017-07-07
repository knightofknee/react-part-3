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
        this.addSong = this.addSong.bind(this);
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

    addSong(songId) {
        axios.post(`/api/playlists/${this.state.playlist.id}/songs`, {id : songId})
        .then((song) => {
            const newPlaylist = Object.assign({}, this.state.playlist);
            newPlaylist.songs = [...this.state.playlist.songs, song];
            this.setState({
                playlist: newPlaylist
            })
        })

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
            <AddSongForm playlist={this.state.playlist} addSong={this.addSong}/>
        </div>)
    }
}

export default Playlist;
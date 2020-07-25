import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect, Link } from 'react-router-dom';
import { compose } from 'redux';
import SongContent from './SongContent';
import * as actions from '../../../store/actions';


class SongsList extends Component {
	render() {

		const { songs, auth, isDarkTheme, onDeleteSong } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />

		return (
			<div className="dashboard container">
				<div className="center-align">
					<h4 className={isDarkTheme ? "white-text" : "black-text"}>Never it's too late to learn a new song and add it to your list.</h4>
					<Link
						to="/add"
						className={`btn z-depth-0 ${isDarkTheme ? "cyan accent-4 waves-effect waves-light" : "grey darken-3 waves-effect waves-light"}`}
					>
						<span className={isDarkTheme ? "black-text" : "white-text"}>
						Add Song
						</span>
					</Link>
				</div>
				<div className="row">
					<div className="project-list section">
						{songs && songs.map(song => {
							return (
								<SongContent 
									key={song.id}
									song={song}
									auth={auth}
									onDeleteSong={onDeleteSong}
								/>
							)
						})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	songs: state.firestore.ordered.songs,
	auth: state.firebase.auth,
	isDarkTheme: state.settings.isDarkTheme
});

const mapDispatchToProps = (dispatch) => ({
	onDeleteSong: (id) => dispatch(actions.deleteSong(id))
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
			{
				collection: 'songs', orderBy: ['createdAt', 'desc']
			}
		])
)(SongsList);
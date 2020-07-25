import * as actionTypes from './actionTypes';

export const addSong = (song) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    firestore.collection('songs').add({
      ...song,
      userFirstName: profile.firstName,
      userLastName: profile.lastName,
      userId: userId,
      createdAt: new Date()
    })
    .then(() => {
      dispatch({ type: actionTypes.ADD_SONG, song });
    })
    .catch( error => {
      dispatch({ type: actionTypes.ADD_SONG_ERROR, error });
    })
  }
}
import * as actionTypes from './actionTypes';

export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
    .then(() => {
      dispatch({ type: actionTypes.SIGNIN_SUCCESS })
    })
    .catch(error => {
      dispatch({ type: actionTypes.SIGNIN_ERROR, error })
    })
  }
}
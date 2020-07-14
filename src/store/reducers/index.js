import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer  } from 'redux-firestore';
import authReducer from './auth';
import settingsReducer from './settings';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  settings: settingsReducer
});

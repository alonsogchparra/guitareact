import * as actionTypes from '../actions/actionTypes';

const initState = {
  songs: [],
  songError: null
}

export default (state = initState, action) => {

  switch(action.type) {

    case actionTypes.ADD_SONG:
      return {
        ...state,
        songError: null
      }

    case actionTypes.ADD_SONG_ERROR:
      return {
        ...state,
        songError: action.error.message
      }

     case actionTypes.DELETE_SONG:
       return {
         ...state,
         songError: null
       }

      case actionTypes.DELETE_SONG_ERROR:
        return {
          ...state,
          songError: action.error.message
        }

    default:
      return state;
  }

}
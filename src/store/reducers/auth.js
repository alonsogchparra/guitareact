import * as actionTypes from '../actions/actionTypes';

const initState = {
  authError: null
}

export default (state = initState, action) => {

  switch(action.type) {

    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        authError: null
      }

    case actionTypes.SIGNIN_ERROR:
      return {
        ...state,
        authError: action.error.message
      }

    default:
      return state;
  }

}
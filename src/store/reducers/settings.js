import * as actionTypes from '../actions/actionTypes';

const initState = {
  isDarkTheme: false
}

export default (state = initState, action) => {

  switch(action.type) {

    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      }

    default:
      return state;
  }

}
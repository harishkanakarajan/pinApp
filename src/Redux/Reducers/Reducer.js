import * as types from '../ActionTypes/Types'

// Initial state
export const initialState = {
  savedPins: []
};

/* 
Root reducer starts with the initial state
and returns state object for further processing
*/
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MATTR_SAVE_PINS:
      return { ...state, savedPins: action.payload };

    default:
      return state;
  }
};
import actionTypes from '../actions/actionTypes';
import regions from '../locales/regions';

const initialState = {
  regions,
  regionsLocal: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IMPORT_PREREQUISITES:
      return {
        ...state,
        [action.name]: action.value
      }
    default: return state;
  }
};

export default reducer;
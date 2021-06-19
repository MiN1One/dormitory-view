import actionTypes from '../actions/actionTypes';
import regions from '../locales/regions';

const months = [
  'jan', 
  'feb', 
  'mar', 
  'ap', 
  'may', 
  'june', 
  'july', 
  'june', 
  'aug', 
  'sep', 
  'oct', 
  'nov', 
  'dec'
];

const initialState = {
  regions,
  months,
  error: null,
  popular: null,
  regionsLocal: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IMPORT_PREREQUISITES:
      return {
        ...state,
        [action.name]: action.value
      }

    case actionTypes.ON_ERROR:
      return { ...state, error: action.error }
    
    default: return state;
  }
};

export default reducer;
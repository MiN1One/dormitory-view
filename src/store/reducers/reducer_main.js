import actionTypes from '../actions/actionTypes';
import regions from '../locales/regions';
import { parseQuery } from '../../utilities/utils';

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
  regionsLocal: null,
  search: (parseQuery('query') && parseQuery('search')) ? parseQuery('search') : '',
  searchRef: null,
  cache: {}
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

    case actionTypes.ON_INPUT_SEARCH:
      return { ...state, search: action.search }

    case actionTypes.ON_STORE_CACHE: 
      return { 
        ...state, 
        cache: { 
          ...state.cache,
          [action.name]: action.cache 
        }
      };
    
    default: return state;
  }
};

export default reducer;
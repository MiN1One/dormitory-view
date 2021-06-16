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

const facilities = [
  'price',
  'kitchen',
  'condition',
  'numberOfRooms',
  'bath',
  'furnitured',
  'internet',
  'parking',
  'discount',
  'gaming',
  'computer',
  'air_conditioner',
  'washing_machine'
];

const initialState = {
  regions,
  months,
  facilities,
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
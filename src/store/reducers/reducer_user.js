import actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_LOG_IN_OUT: return { ...state, user: action.user }

    default: return state;
  }
};

export default reducer;
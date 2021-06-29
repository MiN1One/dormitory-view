import actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  data: null,
  favorites: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_LOG_IN_OUT: 
      // let favoritesList = [ ...action.user.favorites, ...state.favorites ];
      // favoritesList = favoritesList.filter((el, i) => {
      //   return i === favoritesList.indexOf(el);
      // });

      // localStorage.setItem('favorites', JSON.stringify(favoritesList));

      return {
        ...state, 
        user: action.user,
        // favorites: favoritesList
      }

    case actionTypes.ON_SET_AUTH:
      return { ...state, user: action.user };

    case actionTypes.ON_EDIT_FAVORITES: 
      localStorage.setItem('favorites', JSON.stringify(action.list));
      return { ...state, favorites: action.list }

    default: return state;
  }
};

export default reducer;